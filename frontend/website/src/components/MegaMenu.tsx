import Link from 'next/link';
import * as React from 'react';

export default function MegaMenu() {
  return (
    <div>
      <ul className='menu xl:menu-horizontal bg-base-200 rounded-box lg:min-w-max'>
        <li>
          <Link href='/search/solutions'>
            <span>Solutions</span>
          </Link>
          <ul>
            <li>
              <a>Design</a>
            </li>
            <li>
              <a>Development</a>
            </li>
            <li>
              <a>Hosting</a>
            </li>
            <li>
              <a>Domain register</a>
            </li>
          </ul>
        </li>
        <li>
          <Link href='/search/enterprise'>
            <span>Enterprise</span>
          </Link>
          <ul>
            <li>
              <a>CRM software</a>
            </li>
            <li>
              <a>Marketing management</a>
            </li>
            <li>
              <a>Security</a>
            </li>
            <li>
              <a>Consulting</a>
            </li>
          </ul>
        </li>
        <li>
          <a>Products</a>
          <ul>
            <li>
              <a>UI Kit</a>
            </li>
            <li>
              <a>Wordpress themes</a>
            </li>
            <li>
              <a>Wordpress plugins</a>
            </li>
            <li>
              <a>Open source</a>
              <ul>
                <li>
                  <a>Auth management system</a>
                </li>
                <li>
                  <a>VScode theme</a>
                </li>
                <li>
                  <a>Color picker app</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a>Company</a>
          <ul>
            <li>
              <a>About us</a>
            </li>
            <li>
              <a>Contact us</a>
            </li>
            <li>
              <a>Privacy policy</a>
            </li>
            <li>
              <a>Press kit</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
