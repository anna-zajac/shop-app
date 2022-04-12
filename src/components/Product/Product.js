import styles from './Product.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductImage from './ProductImage/ProductImage';
import ProductForm from './ProductForm/ProductForm';

const Product = ({ name, title, basePrice, colors, sizes}) => {

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);

  const prepareColorClassName = color => {
    return styles['color' + color[0].toUpperCase() + color.substr(1).toLowerCase()];
  }

  const getPrice = () => {
    const selectedSize = sizes.find(size => size.name === currentSize);

    return basePrice + selectedSize.additionalPrice;
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log('Summary')
    console.log('============')
    console.log('Name:' + title)
    console.log('Price:' + getPrice)
    console.log('Size' + currentSize)
    console.log('Color' + currentColor)
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
        prepareColorClassName={prepareColorClassName}
        getPrice={getPrice} />
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