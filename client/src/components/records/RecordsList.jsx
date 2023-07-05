import { useContext } from 'react';
import { DataContext } from '../../store/context';
import RecordCard from './RecordCard';

const RecordsList = () => {
  const { data, error, loading } = useContext(DataContext);

  return (
    <>
      {loading && <div>Loading...</div>}

      {error && (
        <div>An error occurred while fetching the data: {error.message}</div>
      )}

      {data && (
        <div className="dashboard">
          <section>
            <h3>Records</h3>
            <div className="records-container">
              {data.map((record) => (
                <RecordCard key={record._id} record={record} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default RecordsList;
