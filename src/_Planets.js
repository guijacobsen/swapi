import React, {Component} from 'react';

// import axios from 'axios';

// import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';

export default class Planets extends Component {

    state = {
        planets: []
    };
 
    componentWillMount() {

        try {
            // axios.get(`https://swapi.co/api/planets/?page=2`)
            // .then(r => {
            //     console.log(r);
                
            //     this.setState({
            //         planets: r.data
            //     });

            //     window.localStorage.setItem('swapi_planets_page2', JSON.stringify(r.data));

            // });

            this.setState({
                planets: JSON.parse(window.localStorage.getItem('swapi_planets'))
            });

        } catch(e) {
            console.log(e);
        }
    }


    render() {

        console.log('this.state.planets');console.log(this.state.planets);

        console.log('JSON.parse(window.localStorage.getItem(swapi_planets))');
        console.log(JSON.parse(window.localStorage.getItem('swapi_planets')));

        console.log('JSON.parse(window.localStorage.getItem(swapi_planets_page2))');
        console.log(JSON.parse(window.localStorage.getItem('swapi_planets_page2')));

        return (
            <div className="planets-list">
                <h1> { this.props.title }: {this.state.planets.count} </h1>

                <ul className="planets">
                    {
                        this.state.planets.results.map( (i,k) => {

                            return (
                                <li key={k}>
                                    <p className="planet-name" onClick={ this.itemClicked.bind(this)  }>
                                    {/* <p className="planet-name" onClick={ $(e) }> */}
                                        { i.name }
                                    </p>
                                    <div className="about">
                                        <div className="center">
                                            <p>Population: <span>{ i.population }</span></p>
                                            <p>Climate: <span>{ i.climate }</span></p>
                                            <p>Terrain: <span>{ i.terrain }</span></p>
                                            
                                            <p className="films-count">Features in {i.films.length} films </p>
                                        </div>

                                    </div>
                                </li>

                            );
                        })
                    }
                </ul>

                <div className="buttons">
                    { ( this.state.planets.previous ) ? <button>Previous</button> : `` }
                    { ( this.state.planets.next ) ? <button>Next</button> : `` }
                </div>
                
                

            </div>
        );
    }

}