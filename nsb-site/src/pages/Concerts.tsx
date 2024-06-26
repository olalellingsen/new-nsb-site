import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
import { db } from "../firebase";
import Concert, { ConcertProps } from "../components/Concert";

interface Props {
  nextOnly?: boolean;
}

function Concerts({ nextOnly }: Props) {
  const [concertData, setConcertData] = useState<DocumentData[]>([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState<ConcertProps[]>([]);
  const [pastConcerts, setPastConcerts] = useState<ConcertProps[]>([]);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Concerts"));
        const newConcertData = querySnapshot.docs.map((doc) =>
          doc.data()
        ) as DocumentData[];
        setConcertData(newConcertData);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterConcertData();
  }, [concertData]); // Update the filtered data whenever concertData changes

  function filterConcertData() {
    const today = new Date();

    const upcomingConcerts = concertData
      .sort((a, b) => {
        const aDate = new Date(a.date.toDate());
        const bDate = new Date(b.date.toDate());
        return aDate.getTime() - bDate.getTime(); // Sort by nearest date
      })
      .filter((concert) => {
        const concertDate = new Date(concert.date.toDate());
        return concertDate > today;
      })
      .map((concert) => ({
        title: concert.title.toString(),
        date: concert.date.toDate().toLocaleDateString(),
        time: concert.date.toDate().toLocaleTimeString().slice(0, -3),
        location: concert.location,
        locationLink: concert.locationLink,
        ticketLink: concert.ticketLink,
        description: concert.description,
        image: concert.image,
      }));

    const pastConcerts = concertData
      .sort((a, b) => {
        const aDate = new Date(a.date.toDate());
        const bDate = new Date(b.date.toDate());
        return bDate.getTime() - aDate.getTime(); // Sort in most recent order
      })
      .filter((concert) => {
        const concertDate = new Date(concert.date.toDate());
        return concertDate < today;
      })
      .map((concert) => ({
        title: concert.title,
        date: concert.date.toDate().toLocaleDateString(),
        location: concert.location,
      }));

    // Set the state variables
    setUpcomingConcerts(upcomingConcerts);
    setPastConcerts(pastConcerts);
  }

  return (
    <>
      {/* for the home page */}
      {nextOnly && (
        <Concert
          title={upcomingConcerts[0]?.title}
          date={upcomingConcerts[0]?.date}
          time={upcomingConcerts[0]?.time}
          location={upcomingConcerts[0]?.location}
          locationLink={upcomingConcerts[0]?.locationLink}
          description={upcomingConcerts[0]?.description}
          ticketLink={upcomingConcerts[0]?.ticketLink}
          image={upcomingConcerts[0]?.image}
        />
      )}

      {/* for the concerts page */}
      {!nextOnly && (
        <div className="mainContent">
          <h1 className="border-b">Kommende konserter</h1>
          <br />
          <div className="sm:w-2/3 mx-auto grid gap-8">
            {/* placeholders */}
            {upcomingConcerts.length === 0 && (
              <div>
                <div className="bg-gray-300 animate-pulse rounded-lg h-72 my-4"></div>
                <div className="bg-gray-300 animate-pulse rounded-lg h-72 my-4"></div>
                <div className="bg-gray-300 animate-pulse rounded-lg h-72 my-4"></div>
                <div className="bg-gray-300 animate-pulse rounded-lg h-72 my-4"></div>
              </div>
            )}

            {/* Render upcoming concerts */}
            <div className="grid gap-4">
              {upcomingConcerts.map((concert) => (
                <Concert {...concert} key={concert.image} />
              ))}
            </div>
            <button
              onClick={() => setShowPast(!showPast)}
              className="w-max mx-auto"
            >
              {showPast ? (
                <>Skjul tidligere konserter</>
              ) : (
                <>Vis tidligere konserter</>
              )}
            </button>
            <div>
              {showPast && (
                <ul>
                  {/* Render past concerts */}
                  {pastConcerts.map((concert) => (
                    <li>
                      <div className="flex py-1">
                        <p>
                          {concert.date} - {concert.title} - {concert.location}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Concerts;
