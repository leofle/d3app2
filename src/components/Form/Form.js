import React, {Fragment} from 'react'
import {StoreContext} from '../../store'
import {Input} from '../../styles'

const Form = () => (
  <StoreContext.Consumer>
		{({changeText}) => (
		<Fragment>
			<label>Change the title </label>
			<Input type="text" 
					name="title"
					onChange={changeText}>
			</Input>
		</Fragment>
		)}
  </StoreContext.Consumer>
)
export default Form;