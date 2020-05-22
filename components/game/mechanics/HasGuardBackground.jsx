import React from 'react';
import PropTypes from 'prop-types';

export default function HasGuardBackground() {
  const [isAnimating, setIsAnimating] = React.useState(false);

  // prettier-ignore
  React.useEffect(() => {
    setIsAnimating(true)
    setTimeout(() => { setIsAnimating(false); }, 200);
  }, []);

  return (
    <div
      className={[
        'minion--has-guard-background uk-animation-scale-up'
        // isAnimating ? '--is-animating' : ''
      ].join(' ')}
      data-file="mechanics/HasGuardBackground"
    />
  );
}

HasGuardBackground.propTypes = {
  moves: PropTypes.object,
  data: PropTypes.object,
  index: PropTypes.number
};
