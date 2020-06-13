import * as React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  hr: {
    border: '1px solid #3f51b5',
    borderRadius: '1px',
    width: '100%',
  },
});

const HorizontalRule = () => {
  let classes = useStyles();

  return <hr className={classes.hr} />;
};

export default HorizontalRule;
