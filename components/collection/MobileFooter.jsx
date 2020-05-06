import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { toggleSiteSidebar } from '@/features/site-sidebar/site-sidebar.slice';

export default function MobileFooter() {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="site__mobile__footer">
        <div className="flex">
          <div>1</div>
          <div>2</div>
          <div>3</div>
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
