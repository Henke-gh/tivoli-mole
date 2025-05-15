import React, { useState } from 'react';
import './StampAttraction.css';

// Define the component props type
type Props = {
  baseCost: number;
  metalCost: number;
  onSelect: (option: 'basic' | 'premium') => void;
};

const AttractionStampSelector: React.FC<Props> = ({ 
  baseCost = 10, 
  metalCost = 15, 
  onSelect = () => {} 
}) => {
  const [selectedOption, setSelectedOption] = useState<'basic' | 'premium'>('basic');

  const handleOptionChange = (option: 'basic' | 'premium') => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="stamp-selector-container">
      <h3 className="stamp-selector-title">Select your stamp option:</h3>
      
      <div className="stamp-options-container">
        <div className="stamp-option">
          <input
            type="radio"
            id="basic-option"
            name="stamp-option"
            className="stamp-input"
            checked={selectedOption === 'basic'}
            onChange={() => handleOptionChange('basic')}
          />
          <label htmlFor="basic-option" className="stamp-label">
            <span className="option-title">Basic stamp:</span>
            <span className="option-price">Animal only - €{baseCost}</span>
          </label>
        </div>
        
        <div className="stamp-option">
          <input
            type="radio"
            id="premium-option"
            name="stamp-option"
            className="stamp-input"
            checked={selectedOption === 'premium'}
            onChange={() => handleOptionChange('premium')}
          />
          <label htmlFor="premium-option" className="stamp-label">
            <span className="option-title">Premium stamp:</span>
            <span className="option-price">Animal + Metal - €{metalCost}</span>
          </label>
        </div>
      </div>
      
      <p className="stamp-note">
        (The specific animal and metal will be assigned to your attraction)
      </p>
    </div>
  );
};

export default AttractionStampSelector;