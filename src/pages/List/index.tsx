import React, {useMemo, useState, useEffect} from 'react';

import {Container, Content, Filters} from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from  '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrenty';
import formatDate from '../../utils/formatDate';

interface IRouteParams{
  match: {
    params: {
      type: string
    }
  }
}

interface IData{
  description: string,
  amountFormatted: string,
  frequency: string,
  dateFormatted: string,
  tagColor: string,
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [ data, setData ] = useState<IData[]>([]);
  const { type } = match.params;

  const title = useMemo(() => {
    return type === 'entry-balance' ? {title: 'Entradas', lineColor: '#F7931B'} : {title: 'Saídas', lineColor: '#E44C4E'};
  }, [type]);

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses
  }, [type])

  const months = [
    { value: 6, label: 'Junho'},
    { value: 7, label: 'Julho'},
    { value: 8, label: 'Agosto'}
  ];

  const years = [
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 }
  ];

  useEffect(() => {
    let resp = listData.map((item) => {
      return{
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
    })

    setData(resp);
  }, [])
  
  return(
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput options={months}/>
        <SelectInput options={years}/>
      </ContentHeader>

      <Filters>
        <button 
          type="button" 
          className="tag-filter tag-filter-recurrent"
        >
          Recorrentes
        </button>

        <button 
          type="button" 
          className="tag-filter tag-filter-eventual"
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {
          data.map((item, index) => {
            return(
              <HistoryFinanceCard 
                key={index}
                tagColor={item.tagColor}
                title={item.description}
                subtitle={item.dateFormatted}
                amount={item.amountFormatted}
              />
            )
          })
        }
      </Content>
    </Container>
  )
}

export default List