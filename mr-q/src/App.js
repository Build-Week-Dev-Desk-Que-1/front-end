import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Signup from './components/Signup'
import Header from './components/Header'
import TicketQueue from './components/TicketQueue'
import './App.css'
import { axiosWithAuth } from './utils/axiosWithAuth'
import { TicketContext } from './contexts/TicketContext'
import CreateTicket from "./components/CreateTicket"
export default function App() {
  //functions for context
  const [tickets, setTickets] = useState([]);
  // console.log(tickets);

const [counter, setCounter] = useState(0)

  useEffect(() => {
    axiosWithAuth()
      .get(``)
      .then((res) => {
        // console.log(res);
        
        setTickets(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [counter]);

  const toggleItem = (itemId) => {
    setTickets((state) =>
      state.map((ticket) => {
        return { ...ticket, clicked: false };
      })
    );

    setTickets((state) =>
      state.map((item) => {
        if (item.id !== itemId) return item;
        return { ...item, clicked: !item.clicked };
      })
    );
  };

  function assignHelper(ticketId, helper) {
    setTickets((state) =>
      state.map((ticket) => {
        return ticket.id === ticketId ? { ...ticket, assigned: helper } : { ...ticket };
      })
    );
  }

  function resolveTicket(ticketId) {
    setTickets((state) =>
      state.map((ticket) => {
        return ticket.id === ticketId ? { ...ticket, resolved: true } : { ...ticket };
      })
    );
  }

  function reassign(ticketId) {
    setTickets((state) =>
      state.map((ticket) => {
        return ticket.id === ticketId ? { ...ticket, assigned: '' } : { ...ticket };
      })
    );
  }

  const [role, setRole] = useState(localStorage.getItem('role'));
console.log(role);
  const [user, setUser] = useState(localStorage.getItem('user'));
  console.log(user);
  const getTickets = () => {
    axiosWithAuth()
      .get(`place backend here`)
      .then((res) => {
        // console.log(res);
        setTickets(res.data);
      })
      .catch((err) => {
      });
  };

  return (
    <div className="page-container">
      <TicketContext.Provider
        value={{
          counter,
          setCounter,
          user,
          setUser,
          getTickets,
          role,
          tickets,
          setTickets,
          setRole,
          toggleItem,
          resolveTicket,
          assignHelper,
          reassign,
        }}>
        <Router>
          <Header />
          {/* <CreateTicket /> */}

          <Switch>
            <Route exact path="/" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute exact path="/protected" component={TicketQueue} />
            <PrivateRoute exact path="/createTicket" component={CreateTicket} />
          </Switch>
        </Router>
      </TicketContext.Provider>
    </div>
  );
}

