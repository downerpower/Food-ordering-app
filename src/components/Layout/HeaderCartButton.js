import { useContext, useEffect, useState } from 'react'

import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
   const [btnIshighlighted, setBtnIshighlighted] = useState(false);
   const cartCtx = useContext(CartContext);

   const { items } = cartCtx;

   const numerOfCartItems = items.reduce((curNumber, item) => curNumber + item.amount, 0);

   const btnClasses = `${classes.button} ${btnIshighlighted ? classes.bump : ''}`;

   useEffect(() => {
      if (cartCtx.items.length === 0) {
         return;
      }
      setBtnIshighlighted(true);

      const timer = setTimeout(() => {
         setBtnIshighlighted(false);
      }, 300);

      return () => {
         clearTimeout(timer);
      };
      
   }, [items]);

   return (
      <button className={btnClasses} onClick={props.onClick}>
         <span className={classes.icon}>
            <CartIcon />
         </span>
         <span>Your Cart</span>
         <span className={classes.badge}>
            {numerOfCartItems}
         </span>
      </button>
   );
};

export default HeaderCartButton