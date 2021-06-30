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
  const [data, setData] = useState<IData[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>(String(new Date().getMonth() + 1));
  const [currentYear, setCurrentYear] = useState<string>(String(new Date().getFullYear()));

  const { type } = match.params;

  const title = useMemo(() => {
    return type === 'entry-balance' ? {title: 'Entradas', lineColor: '#F7931B'} : {title: 'Saídas', lineColor: '#E44C4E'};
  }, [type]);

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses
  }, [type])

  const months = [
    { value: 8, label: 'Agosto'},
    { value: 7, label: 'Julho'},
    { value: 6, label: 'Junho'},
    { value: 1, label: 'Janeiro'},
    { value: 3, label: 'Março'},
  ];

  const years = [
    { value: 2019, label: 2019 },
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
  ];

  useEffect(() => {
    let filteredDate = listData.filter((item) => {
      const date = new Date(item.date);
      const filterMonth = String(date.getMonth() + 1);  
      const filterYear = String(date.getFullYear());
      
      return filterMonth === currentMonth && filterYear === currentYear;
    });

    let resp = filteredDate.map((item) => {
      return{
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
    });

    setData(resp);
  }, [listData, currentMonth, currentYear])
  
  return(
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput 
          options={months} 
          onChange={
            (e) => setCurrentMonth(e.target.value)
          } 
          defaultValue={currentMonth}
        />

        <SelectInput 
          options={years} 
          onChange={
            (e) => setCurrentYear(e.target.value)
          } 
          defaultValue={currentYear}
        />
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