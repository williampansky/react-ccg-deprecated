import React from 'react';
import Component from '@/components/collection/Card';

export default function ComponentDeveloper() {
  const styles = {
    width: '100vw',
    height: '80vh',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={styles}>
      <div>
        <Component />
      </div>
    </div>
  );
}
