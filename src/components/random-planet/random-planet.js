import React, {Component} from "react";
import './random-planet.css'
import SwapiService from "../../services/swapi-servise";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

  SwapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    this.updatePlanet();
    setInterval(this.updatePlanet, 2500)
  }

  onPlanetLoaded = (planet) => {
    this.setState({planet, loading: false})
  };

  onError = (err) => {
    this.setState({error: true, loading: false})
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 18) + 2;
    this.SwapiService.getPlanet(id).then(this.onPlanetLoaded).catch(this.onError)
  };

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <PlanetViews planet={planet}/> : null;

    return (
        <div className="random-planet jumbotron rounded">
          {errorMessage}
          {spinner}
          {content}
        </div>
    );
  }
};


const PlanetViews = ({planet}) => {
  const { name, population, rotationPeriod, diameter, id } = planet;

  return (
      <React.Fragment>
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
  )
};