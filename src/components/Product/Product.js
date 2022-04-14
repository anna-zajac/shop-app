import styles from './Product.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductImage from './ProductImage/ProductImage';
import ProductForm from './ProductForm/ProductForm';
import { useMemo } from 'react/cjs/react.production.min';

const Product = ({ name, title, basePrice, colors, sizes}) => {

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);

  const getPrice = useMemo(() => {
    const selectedSize = sizes.find(size => size.name === currentSize);

    return basePrice + selectedSize.additionalPrice;
  }, [currentSize, sizes, basePrice]);

  const handleSubmit = e => {
    e.preventDefault();

    console.log('Summary')
    console.log('============')
    console.log('Name: ' + title)
    console.log('Price: ' + getPrice())
    console.log('Size: ' + currentSize)
    console.log('Color ' + currentColor)
  }

  return (
    <article className={styles.product}>
      <ProductImage name={name} title={title} currentColor={currentColor} />
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>Price: {getPrice()}$ </span>
        </header>
        <ProductForm
        handleSubmit={handleSubmit}
        currentSize={currentSize}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        setCurrentSize={setCurrentSize}
        getPrice={getPrice}
        sizes={sizes}
        colors={colors} />
      </div>
    </article>
  )
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
  sizes: PropTypes.array.isRequired
};

export default Product;