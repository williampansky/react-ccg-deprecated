import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { toggleSiteSidebar } from '@/features/site-sidebar/site-sidebar.slice';

export default function MobileFooter() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <React.Fragment>
      <div className="site__mobile__footer">
        <div className="flex">
          <div>
            <button onClick={() => router.back()}>
              <ReactSVG src="/images/site/icon-uikit-reply.svg" />
            </button>
          </div>
          <div>
            <button>2</button>
          </div>
          <div>
            <button>
              <ReactSVG src="/images/site/icon-uikit-settings.svg" />
            </button>
          </div>
          <div>
            <button onClick={() => dispatch(toggleSiteSidebar())}>
              <ReactSVG src="/images/site/icon-uikit-thumbnails.svg" />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
