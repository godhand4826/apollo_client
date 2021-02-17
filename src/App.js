import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function App() {
    const { loading, error, data, refetch } = useQuery(EXCHANGE_RATES)
    const [show, setShow] = useState(true)
    if (!show){
        return "loading"
    }
    if (loading) return <p>loading...</p>
    if (error) return <p>Error :(</p>
    return <div onClick={() => {
        setShow(false)
        setTimeout(() => {
            setShow(true)
            refetch()
        }, 1000);
    }}>{
            data.rates.map(({ currency, rate }) => (
                <div key={currency}>
                    <p> {currency}:{rate} </p>
                </div>))
        }</div>
}
export default App;