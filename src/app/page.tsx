'use client'
import { useState, useEffect } from 'react';
import { connectWebSocket, disconnectWebSocket } from '@/config/websocket';
import Table from '@/app/shared/components/Table';
import { css } from '@emotion/css';

const containerStyle = css`
display: flex;
justify-content: center;
`;

const Home: React.FC = () => {
  const [data, setData] = useState<{ s: string; P: number; c: string; }[]>([]);

  const handleWebSocketMessage = (message: any) => {
    setData(prevDataArray => {
      const updatedArray = [...prevDataArray];

      message.forEach((newData: any) => {
        const existingIndex = prevDataArray.findIndex(item => item.s === newData.s);

        if (existingIndex !== -1) {
          updatedArray[existingIndex] = newData;
        } else {
          updatedArray.push(newData);
        }
      });

      return updatedArray;
    });
  };

  useEffect(() => {
    connectWebSocket('/!ticker@arr', handleWebSocketMessage);
    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <div className={containerStyle}>
      <Table data={data} />
    </div>
  );
};

export default Home;
