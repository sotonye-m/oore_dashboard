import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProgressBar from '../components/progressbar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <main style={{ marginTop: '40px', display: 'flex' }}>
        <Sidebar />
        <section style={{ flex: 1, paddingLeft: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ProgressBar percentage={51} /> {/*Progress bar component */}
            <PrimaryButton>
              Donate {/*Primary button component */}
            </PrimaryButton>
            <SecondaryButton>
              View Project {/*Secondary button component */}
            </SecondaryButton>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
