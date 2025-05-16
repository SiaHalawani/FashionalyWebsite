import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import containers from '../../../CSS/containers.module.css';

export default function Footer({ setChatWithId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllUsers();
      setUsers(res.slice(0, 20));
    };
    fetch();
  }, []);

  return (
    <footer className={containers.footercontainer}>
      <div className={containers.desktopOnly}>
      
      </div>
    </footer>
  );
}
