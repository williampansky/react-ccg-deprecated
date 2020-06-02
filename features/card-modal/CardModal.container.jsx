import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setData } from './card-modal.slice';
import styles from './styles.module.scss';

// direct child components
import CloseButton from './components/CloseButton/CloseButton';
import ModalDialog from './components/ModalDialog/ModalDialog';
import CardWrapper from './components/CardWrapper/CardWrapper';
import CardInfo from './components/CardInfo/CardInfo';

export default function CardModal() {
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  const data = useSelector(state => state.cardModal);
  const database = useSelector(state => state.database);

  function handleModalClose() {
    const id = query && query.id;

    if (id) {
      router.push(`/collection/decks/[id]`, `${router.asPath}`, {
        shallow: true
      });
    } else {
      router.push(router.pathname);
    }

    return dispatch(setData(null));
  }

  return (
    <div
      className={
        data !== null
          ? [styles.component, styles.open].join(' ')
          : styles.component
      }
      data-file="CardModal"
      onClick={() => handleModalClose()}
      onKeyPress={() => handleModalClose()}
      role="button"
      tabIndex={0}
    >
      <CloseButton />
      {data !== null ? (
        <React.Fragment>
          <ModalDialog>
            <CardWrapper data={data} />
            <CardInfo data={data} database={database} />
          </ModalDialog>
        </React.Fragment>
      ) : null}
    </div>
  );
}
