import React, {Fragment} from 'react'
import {StoreContext} from '../../store'
import DonutChart from '../Donut/Donut'
import Form from '../Form/Form'
import {Card, CardFlex, DonutContainer, Title} from '../../styles'

const Home = () => (
  <StoreContext.Consumer>
    {({state})=> (
      <Fragment>
        <CardFlex>
          <Title>
            {state.msg || 'Welcome to React Graph YaY!'}
          </Title>
          <img src="./favicon.ico" width="20px" alt="react logo"/>
        </CardFlex>
        <Card>
          <Form/>
        </Card>
        <Card>
        <DonutContainer>
          <DonutChart width={960} height={500} data={state.data}/>
        </DonutContainer>
        </Card>
      </Fragment>
    )
    }
  </StoreContext.Consumer>
)
export default Home;