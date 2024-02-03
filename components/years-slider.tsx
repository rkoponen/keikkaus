import { Slider } from './ui/slider';
import React from 'react';
interface YearsSliderProps {
  handleSliderChange: () => void;
  years: number;
}


export const YearsSlider = ({ handleSliderChange, years }: YearsSliderProps) => {

  return (<div className="w-full text-center">
    <label className="" htmlFor="slider">
      Kuinka monta vuotta haluat simuloida?
    </label>
    <Slider
      className="mt-2"
      id="slider"
      defaultValue={[25]}
      min={1}
      max={100}
      step={1}
      onValueChange={handleSliderChange}
    />
    <span className="text-lg font-medium">{years} vuotta</span>
  </div>)
}
