import React from 'react';
import './creathonDetails.css';

class CreathonDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDateTime: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentDateTime: new Date()
    });
  }

  render() {
    const { currentDateTime } = this.state;
    const dateString = currentDateTime.toLocaleDateString();
    const timeString = currentDateTime.toLocaleTimeString();

    return (
      <div className="creathon-details">
        <h1>Bienvenue dans notre plateforme TACIR - CREA</h1>
        <p>Merci pour l'utilisation de notre service</p>
        <div className="date-time">
          <p>Date: {dateString}</p>
          <p>Heure: {timeString}</p>
        </div>
      </div>
    );
  }
}

export default CreathonDetails;
