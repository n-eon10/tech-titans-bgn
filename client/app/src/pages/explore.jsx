import React, { useState, useEffect } from 'react';
import EventCard from '../components/ui/eventcard'; // Adjust the path as needed
import ExploreCard from '../components/ui/explorecard'; // Adjust the path as needed

const Explore = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [newBusinesses, setNewBusinesses] = useState([]);
  const [topBusinesses, setTopBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch upcoming events
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/events/upcomingevents');
        const data = await response.json();
        setUpcomingEvents(data.upcomingEvents.reverse());
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchUpcomingEvents();
  }, []);  // Empty dependency array to run this once when the component mounts

  // Fetch new businesses
  useEffect(() => {
    const fetchNewBusinesses = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/blackbusinesses/getallblackbusiness');
        const data = await response.json();
        setNewBusinesses(data.data);
      } catch (error) {
        console.error('Error fetching new businesses:', error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchNewBusinesses();
  }, []);  // Empty dependency array to run this once when the component mounts

  // Fetch top-rated businesses
  useEffect(() => {
    const fetchTopBusinesses = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/blackbusinesses/trendingbusinesses');
        const data = await response.json();
        setTopBusinesses(data.topBusinesses);
      } catch (error) {
        console.error('Error fetching top-rated businesses:', error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchTopBusinesses();
  }, []);  // Empty dependency array to run this once when the component mounts

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-10 p-8">
      {/* Upcoming Events */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="flex overflow-x-auto space-x-4">
          {upcomingEvents.map((event, index) => (
            <EventCard
              key={index}
              name={event.name}
              location={event.generalLocation}
              description={event.description}
              date={event.date}
              link={event.link}
              type="Event"
            />
          ))}
        </div>
      </section>

      {/* New Businesses */}
      <section>
        <h2 className="text-2xl font-bold mb-4">New Businesses</h2>
        <div className="flex overflow-x-auto space-x-4">
          {newBusinesses.map((business, index) => (
            <ExploreCard
              key={index}
              name={business.name}
              location={business.generalLocation}
              description={business.description}
              rating={business.rating}
              reviews={business.reviews || []}
              category={business.category}
              link={business.link}
            />
          ))}
        </div>
      </section>

      {/* Top-Rated Businesses */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top-Rated Businesses</h2>
        <div className="flex overflow-x-auto space-x-4">
          {topBusinesses.map((business, index) => (
            <ExploreCard
              key={index}
              name={business.name}
              location={business.generalLocation}
              description={business.description}
              rating={business.rating}
              reviews={business.reviews || []}
              category={business.category}
              link={business.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
