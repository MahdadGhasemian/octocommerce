'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import RatingSelect from '@/components/review/RatingSelect';
import RecommendSelect from '@/components/review/RecommendSelect';

import basicService, { RecommendationType } from '@/services/basic.service';

type ReviewFormProps = {
  product_id: number;
  onClose?: () => void;
};

const ReviewForm: React.FC<ReviewFormProps> = (props: ReviewFormProps) => {
  // ** Route
  const router = useRouter();

  // ** Props
  const { product_id, onClose } = props;

  // ** State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pro, setPro] = useState('');
  const [prosList, setProsList] = useState<string[]>([]);
  const [con, setCon] = useState('');
  const [consList, setConsList] = useState<string[]>([]);
  const [recommended, setRecommended] = useState<RecommendationType>(
    RecommendationType.UNKNOWN
  );
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);

  // ** Functions
  const resetForm = () => {
    setTitle('');
    setContent('');
    setPro('');
    setProsList([]);
    setCon('');
    setConsList([]);
    setRecommended(RecommendationType.UNKNOWN);
    setIsAnonymous(false);
    setRating(0);
  };

  async function submitReview() {
    const review = {
      product_id,
      title,
      content,
      rating,
      pros: prosList,
      cons: consList,
      recommended,
      is_anonymous: isAnonymous,
    };

    try {
      await basicService.createReview(review);

      resetForm();

      if (onClose) onClose();
      router.refresh();
    } catch (error) {
      //
    }
  }

  const handleAddPro = (e: React.MouseEvent<HTMLButtonElement> | null) => {
    e?.preventDefault();

    if (pro.trim()) {
      setProsList([...prosList, pro]);
      setPro('');
    }
  };

  const handleAddCon = (e: React.MouseEvent<HTMLButtonElement> | null) => {
    e?.preventDefault();

    if (con.trim()) {
      setConsList([...consList, con]);
      setCon('');
    }
  };

  return (
    <div className='w-full'>
      {/* Rating */}
      <div className='px-4 py-8 flex flex-row items-center justify-between border-b-2 border-base-200'>
        <p>امتیاز شما به این محصول</p>
        <RatingSelect
          initialValue={rating}
          onChange={(value) => setRating(value)}
        />
      </div>
      {/* Recommened */}
      <div className='px-4 py-8 flex flex-col items-start gap-4 border-b-2 border-base-200'>
        <label htmlFor='recommended' className='text-sm font-medium'>
          <span>خرید این محصول را به دیگران ...</span>
          <span className='text-error'>*</span>
        </label>
        <RecommendSelect
          initialValue={recommended}
          onChange={(value) => setRecommended(value)}
        />
      </div>
      {/* Form */}
      <form action={submitReview}>
        <div className='flex flex-col gap-4 py-8'>
          <p>دیدگاه خود را شرح دهید</p>

          <div className='flex flex-col gap-4'>
            <label htmlFor='title' className='text-sm font-medium'>
              عنوان نظر
            </label>
            <input
              type='text'
              id='title'
              name='title'
              className='input input-bordered input-secondary w-full'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-4'>
            <label htmlFor='pros' className='text-sm font-medium'>
              نکات مثبت
            </label>
            <label className='input input-bordered input-secondary flex items-center gap-2'>
              <input
                type='text'
                id='pros'
                name='pros'
                className='grow'
                value={pro}
                onChange={(e) => setPro(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddPro(null);
                  }
                }}
              />
              <button className='btn btn-ghost btn-sm' onClick={handleAddPro}>
                <PlusIcon />
              </button>
            </label>
            {prosList?.length ? (
              <div className='flex flex-col gap-1'>
                {prosList.map((item) => (
                  <div
                    key={`pro-item-key-${item}`}
                    className='flex flex-row gap-1 items-center'
                  >
                    <PlusIcon size={18} className='text-success' />
                    <p className='text-sm'>{item}</p>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className='flex flex-col gap-4'>
            <label htmlFor='cons' className='text-sm font-medium'>
              نکات منفی
            </label>
            <label className='input input-bordered input-secondary flex items-center gap-2'>
              <input
                type='text'
                id='cons'
                name='cons'
                className='grow'
                value={con}
                onChange={(e) => setCon(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCon(null);
                  }
                }}
              />
              <button className='btn btn-ghost btn-sm' onClick={handleAddCon}>
                <MinusIcon />
              </button>
            </label>
            {consList?.length ? (
              <div className='flex flex-col gap-1'>
                {consList.map((item) => (
                  <div
                    key={`con-item-key-${item}`}
                    className='flex flex-row gap-1 items-center'
                  >
                    <MinusIcon size={18} className='text-error' />
                    <p className='text-sm'>{item}</p>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className='flex flex-col gap-4'>
            <label htmlFor='title' className='text-sm font-medium'>
              <span>متن نظر</span>
              <span className='text-error'>*</span>
            </label>
            <textarea
              id='content'
              name='content'
              className='textarea textarea-bordered textarea-secondary w-full'
              required
              placeholder='برای ما بنویسید ...'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className='flex flex-row gap-4 items-center'>
            <input
              id='is_anonymous'
              name='is_anonymous'
              type='checkbox'
              className='checkbox checkbox-secondary'
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <label htmlFor='title' className='text-sm font-medium'>
              ارسال دیدگاه به صورت ناشناس
            </label>
          </div>

          <button className='btn w-full btn-primary text-primary-content'>
            ثبت امتیاز و دیدگاه
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
