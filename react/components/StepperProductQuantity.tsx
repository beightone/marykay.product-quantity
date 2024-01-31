import React, { FunctionComponent } from 'react'
import { NumericStepper } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { SelectedItem } from 'vtex.product-context'

import { OnChangeCallback, BaseProps } from './BaseProductQuantity'

const DEFAULT_UNIT = 'un'

interface StepperProps {
  unitMultiplier: SelectedItem['unitMultiplier']
  measurementUnit: SelectedItem['measurementUnit']
  selectedQuantity: BaseProps['selectedQuantity']
  availableQuantity: number
  onChange: (e: OnChangeCallback) => void
  size: BaseProps['size']
  showUnit: boolean
}

const CSS_HANDLES = ['quantitySelectorStepper', 'limitQuantity'] as const

const StepperProductQuantity: FunctionComponent<StepperProps> = ({
  unitMultiplier = 1,
  measurementUnit = DEFAULT_UNIT,
  size = 'small',
  selectedQuantity,
  availableQuantity,
  onChange,
  showUnit,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const maxValueSelected = 99
  const maxTotalQuantity = availableQuantity < maxValueSelected ? availableQuantity : maxValueSelected
  return (
    <div className={handles.quantitySelectorStepper}>
      <NumericStepper
        size={size}
        minValue={1}
        unitMultiplier={unitMultiplier}
        suffix={
          showUnit && measurementUnit !== DEFAULT_UNIT
            ? measurementUnit
            : undefined
        }
        onChange={onChange}
        value={selectedQuantity}
        maxValue={maxTotalQuantity || undefined}
      />
    {maxTotalQuantity === selectedQuantity &&
      (<span className={handles.limitQuantity}>Limite atingido!</span>)
    }
    </div>
  )
}

export default StepperProductQuantity
