import React, {Component} from 'react';

import axios from 'axios';

import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
// import 'react-accessible-accordion/dist/minimal-example.css';

export default class Planets extends Component {

    state = {
        planets: [],
        currentPage: 1
    };

    nextPage() {
        console.log('-- nextPage --');
        
        console.log( this.state );
        try {
            axios.get(`${ this.state.planets.next }`)
            .then(r => {
                console.log(r);
                
                this.setState({
                    planets: r.data,
                    currentPage: this.state.currentPage + 1
                });

            });

        } catch(e) {
            console.log(e);
        }
    }

    prevPage() {
        console.log('-- prevPage --');

        try {
            axios.get(`${ this.state.planets.previous }`)
            .then(r => {
                console.log(r);
                
                this.setState({
                    planets: r.data,
                    currentPage: this.state.currentPage - 1
                });

            });

        } catch(e) {
            console.log(e);
        }

    }

    getPlanets() {

        try {
            axios.get(`https://swapi.co/api/planets`)
            .then(r => {
                console.log(r);

                let planets = r.data;
                let totalPages = parseInt(planets.count / planets.results.length);

                if( parseInt(planets.count % planets.results.length) != 0 ) {
                    totalPages++;
                }


                
                this.setState({
                    planets: r.data,
                    currentPage: 1,
                    totalPages
                });
    
            });
    
        } catch(e) {
            console.log(e);
        }

    }
 
    componentWillMount() {

        // this.getPlanets();
    }

    render() {
        console.log('--- Planets render() ---');
        console.log('this.state.planets');console.log(this.state.planets);

        if( ! this.state.planets.results ) {

            return (
                <div className="buttons full-height">
                    <button className="ma" onClick={ this.getPlanets.bind(this) }>
                        Listar planetas
                    </button>
                </div>
            );

        } else {
            return (
                <div className="planets-list">
                    <h1>
                        <span className="left">
                            { this.props.title } ({this.state.planets.count})
                        </span>
                        <span className="right">
                            Pag. {this.state.currentPage}/{this.state.totalPages}
                        </span>
                        <div className="clear"></div>
                    </h1>
    
                     <Accordion className="ul">
                     {
                        this.state.planets.results.map( (i,k) => {
    
                            return (
                                <AccordionItem key={`${this.state.currentPage}-${k}`} className="li" >
                                    <AccordionItemTitle className="planet-name">
                                        { i.name }
                                    </AccordionItemTitle>
    
                                    <AccordionItemBody>
                                        <div className="about">
                                            <div className="center">
                                                <p>Population: <span>{ i.population }</span></p>
                                                <p>Climate: <span>{ i.climate }</span></p>
                                                <p>Terrain: <span>{ i.terrain }</span></p>
                                                
                                                <p className="films-count">Features in {i.films.length} films </p>
                                            </div>
    
                                        </div>
                                    </AccordionItemBody>
                                </AccordionItem>
                            );
                        })
                    }
                     </Accordion>
    
                    <div className="buttons">
                        { ( this.state.planets.previous ) ? <button onClick={ this.prevPage.bind(this) } >Previous</button> : `` }
                        { ( this.state.planets.next ) ? <button onClick={ this.nextPage.bind(this) } className="alg-l">Next</button> : `` }
                    </div>
                    
                    
    
                </div>
            );
        }

        
    }

}