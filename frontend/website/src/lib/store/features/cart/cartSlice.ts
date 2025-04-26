import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/lib/store/store';

import {
  Address,
  DeliveryMethod,
  DeliveryMethodAreaRule,
  DeliveryPricingType,
  Setting,
} from '@/services/basic.service';
import { calculateCostPerDistance } from '@/utils/location';

export interface PackagingCostItem {
  id: number;
  title?: string;
  cost: number;
  shared_packaging: boolean;
}
export interface Item {
  id: string | number;
  product_code: string;
  name: string;
  image?: string;
  sale_price: number;
  quantity?: number;
  stock?: number;
  unit?: string;
  is_online_payment_allowed?: boolean;
  packaging_cost?: PackagingCostItem;
  [key: string]: unknown;
}

export interface CartState {
  items: Item[];
  isEmpty: boolean;
  subtotal: number;
  packaging_cost: number;
  delivery_cost: number;
  discount_percentage: number;
  discount_amount: number;
  tax_amount: number;
  round_amount: number;
  total: number;
  deliveryAddress?: Partial<Address> | null;
  billingAddress?: Partial<Address> | null;
  deliveryMethod?: DeliveryMethod | null;
  deliveryMethodAreaRule?: DeliveryMethodAreaRule | null;
  setting?: Setting | null;
}

const initialState: CartState = {
  items: [],
  isEmpty: true,
  subtotal: 0,
  packaging_cost: 0,
  delivery_cost: 0,
  discount_percentage: 0,
  discount_amount: 0,
  tax_amount: 0,
  round_amount: 0,
  total: 0,
  deliveryAddress: null,
  billingAddress: null,
  deliveryMethod: null,
  deliveryMethodAreaRule: null,
  setting: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<{ item: Item; quantity: number }>) => {
      const { item, quantity } = action.payload;

      const index = state.items.findIndex(existingItem => existingItem.id === item.id);

      if (index >= 0) {
        state.items[index].quantity = (state.items[index].quantity || 0) + (quantity || 0);
      } else {
        state.items = [...state.items, { ...item, quantity }];
      }

      resetDeliveryMethod(state);
      generateFinalState(state);
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: Item['id']; quantity: number }>) => {
      const { id, quantity } = action.payload;

      state.items = state.items.reduce((acc: Item[], item) => {
        if (item.id === id) {
          const newQuantity = (item.quantity || 0) - quantity;

          return newQuantity > 0 ? [...acc, { ...item, quantity: newQuantity }] : [...acc];
        }
        return [...acc, item];
      }, []);

      resetDeliveryMethod(state);
      generateFinalState(state);
    },
    updateItemQuantityCart: (state, action: PayloadAction<{ id: Item['id']; quantity: number }>) => {
      const { id, quantity } = action.payload;

      state.items = state.items.reduce((acc: Item[], item) => {
        if (item.id === id) {
          return [...acc, { ...item, quantity }];
        }
        return [...acc, item];
      }, []);

      resetDeliveryMethod(state);
      generateFinalState(state);
    },
    clearItemFromCart: (state, action: PayloadAction<{ id: Item['id'] }>) => {
      const { id } = action.payload;

      state.items = state.items.filter(existingItem => existingItem.id !== id);

      resetDeliveryMethod(state);
      generateFinalState(state);
    },
    setDeliveryAddress: (state, action: PayloadAction<Partial<Address> | null>) => {
      const address = action.payload;

      state.deliveryAddress = address;

      generateFinalState(state);
    },
    setBillingAddress: (state, action: PayloadAction<Partial<Address> | null>) => {
      const address = action.payload;

      state.billingAddress = address;
    },
    setDeliveryMethodSelected: (state, action: PayloadAction<DeliveryMethod>) => {
      const deliveryMethod = action.payload;

      state.deliveryMethod = deliveryMethod;

      generateFinalState(state);
    },
    setDeliveryMethodAreaRuleSelected: (state, action: PayloadAction<DeliveryMethodAreaRule>) => {
      const deliveryMethodAreaRule = action.payload;

      state.deliveryMethodAreaRule = deliveryMethodAreaRule;

      generateFinalState(state);
    },
    setCartSetting: (state, action: PayloadAction<Setting>) => {
      state.setting = action.payload;

      generateFinalState(state);
    },
    resetCart: state => {
      Object.assign(state, initialState);
    },
  },
});

const resetDeliveryMethod = (state: CartState) => {
  state.deliveryMethod = null;
};

const generateFinalState = (state: CartState) => {
  const tax_rate_default = state.setting?.tax_rate_default || 0;

  state.items.forEach(item => (item.total = (item?.sale_price || 0) * (item.quantity || 0)));

  const { subtotal, discount_amount, packaging_cost, delivery_cost, tax_amount, round_amount, total } = calculatePrices(
    tax_rate_default,
    state.items,
    state.deliveryMethod,
    state.deliveryMethodAreaRule,
    state.setting?.delivery_center_latitude,
    state.setting?.delivery_center_longitude,
    state.deliveryAddress?.latitude,
    state.deliveryAddress?.longitude
  );

  state.subtotal = subtotal;
  state.discount_amount = discount_amount;
  state.packaging_cost = packaging_cost;
  state.delivery_cost = delivery_cost;
  state.tax_amount = tax_amount;
  state.round_amount = round_amount;
  state.total = total;
  state.isEmpty = state.items.length === 0;
};

const calculatePrices = (
  tax_rate: number,
  items: {
    sale_price: number;
    quantity?: number;
    packaging_cost?: { id: number; cost: number; shared_packaging: boolean };
  }[],
  deliveryMethod?: DeliveryMethod | null,
  deliveryMethodAreaRule?: DeliveryMethodAreaRule | null,
  delivery_center_latitude?: number,
  delivery_center_longitude?: number,
  delivery_address_latitude?: number,
  delivery_address_longitude?: number
): {
  discount_amount: number;
  tax_amount: number;
  round_amount: number;
  packaging_cost: number;
  delivery_cost: number;
  subtotal: number;
  total: number;
} => {
  // Rounding Factor
  const rounding_factor = 1;

  // subtotal
  const subtotal = +items.reduce((acc, item) => acc + (item?.sale_price || 0) * (item.quantity || 0), 0);

  // packaging cost
  const packaging_cost = calculateTotalPackagingCost(items);

  // delivery cost
  const delivery_cost = calculateDeliveryCost(
    deliveryMethod,
    deliveryMethodAreaRule,
    delivery_center_latitude,
    delivery_center_longitude,
    delivery_address_latitude,
    delivery_address_longitude
  );

  // tax amount
  const tax_amount = (subtotal + packaging_cost + delivery_cost) * (tax_rate / 100);

  // discount amount
  const discount_amount = 0;

  //  total with tax, packaging, and delivery costs
  let totalWithExtras = subtotal + packaging_cost + delivery_cost + tax_amount;

  // Apply rounding
  const round_amount = rounding_factor > 0 ? rounding_factor - (totalWithExtras % rounding_factor) : 0;
  totalWithExtras += Number(round_amount);

  return {
    discount_amount,
    tax_amount,
    round_amount,
    packaging_cost,
    delivery_cost,
    subtotal,
    total: totalWithExtras,
  };
};

const calculateTotalPackagingCost = (
  items: {
    packaging_cost?: { id: number; cost: number; shared_packaging: boolean };
  }[]
): number => {
  let packaging_cost = 0;
  const handledPackagingIds = new Set<number>();

  for (const item of items) {
    const costItem = item?.packaging_cost;

    if (!costItem) continue;

    // Skip if this packaging cost ID has already been handled
    if (handledPackagingIds.has(costItem.id)) continue;

    // Add the cost to the total
    packaging_cost += Number(costItem?.cost || 0);

    // If shared_packaging is true, mark the ID as handled and stop processing further for this group
    if (costItem.shared_packaging) {
      handledPackagingIds.add(costItem.id);
    }
  }

  return packaging_cost;
};

const calculateDeliveryCost = (
  deliveryMethod?: DeliveryMethod | null,
  deliveryMethodAreaRule?: DeliveryMethodAreaRule | null,
  delivery_center_latitude?: number,
  delivery_center_longitude?: number,
  delivery_address_latitude?: number,
  delivery_address_longitude?: number
) => {
  let delivery_cost = 0;

  if (
    deliveryMethod?.delivery_pricing_type === DeliveryPricingType.SELECTED_AREA &&
    deliveryMethod.delivery_method_area_rules?.length
  ) {
    delivery_cost = Number(deliveryMethodAreaRule?.price || 0);
  } else if (deliveryMethod?.delivery_pricing_type === DeliveryPricingType.PER_KILOMETER) {
    delivery_cost = calculateCostPerDistance(deliveryMethod?.fixed_price || 0, deliveryMethod.per_kilometer || 0, [
      {
        latitude: delivery_center_latitude,
        longitude: delivery_center_longitude,
      },
      {
        latitude: delivery_address_latitude,
        longitude: delivery_address_longitude,
      },
    ]);
  } else {
    delivery_cost = Number(deliveryMethod?.fixed_price || 0);
  }

  return delivery_cost;
};

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantityCart,
  clearItemFromCart,
  setCartSetting,
  resetCart,
  setDeliveryAddress,
  setBillingAddress,
  setDeliveryMethodSelected,
  setDeliveryMethodAreaRuleSelected,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectTaxAmount = (state: RootState) => state.cart.tax_amount;
export const selectRoundAmount = (state: RootState) => state.cart.round_amount;
export const selectPackagingCost = (state: RootState) => state.cart.packaging_cost;
export const selectDeliveryCost = (state: RootState) => state.cart.delivery_cost;
export const selectDeliveryMethod = (state: RootState) => state.cart.deliveryMethod;
export const selectDeliveryMethodAreaRule = (state: RootState) => state.cart.deliveryMethodAreaRule;
export const selectDeliveryAddress = (state: RootState) => state.cart.deliveryAddress;
export const selectBillingAddress = (state: RootState) => state.cart.billingAddress;
