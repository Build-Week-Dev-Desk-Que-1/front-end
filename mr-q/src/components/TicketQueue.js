import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import TicketList from './TicketList';
import { TicketContext } from '../contexts/TicketContext';

export default function TicketQueue() {
  const { role } = useContext(TicketContext);

  let history = useHistory();

  // console.log(role);

  const createTicket = (e) => {
    e.preventDefault();
    history.push('/createTicket');
  };

  return (
    <>
      <div>
        <h1>Ticket Queue</h1>
        <button  onClick={createTicket}>
          Add Ticket
        </button>
        <TicketList />
      </div>
    </>
  );
}