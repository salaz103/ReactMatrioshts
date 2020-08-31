import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Traduccion from '../components/Traduccion';
import ReporteAST from '../components/ReporteAST';
import Header from '../components/Header';


const AppRouter=()=>(
    <BrowserRouter>
    <div>
    <Header title='ReactMatrioshTS- 201213181'></Header>
        <Switch>
      <Route path="/" component={Traduccion} exact={true}/>
      <Route path="/ast" component={ReporteAST}/>
      </Switch>  
    </div>
    </BrowserRouter>
);

export default AppRouter;