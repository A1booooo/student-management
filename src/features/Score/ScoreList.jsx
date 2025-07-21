import { useState,useEffect } from 'react';

import ScoreListItem from './ScoreListItem'
import getScoreList from '../../services/apiScore'

export default function ScoreList() {
  const [scoreList, setScoreList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const mockScoreList = await getScoreList();
      setScoreList(mockScoreList);
    };
    fetchData();
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-fixed w-full">
        <thead>
          <tr>
            <th className='w-1/6'>Name</th>
            <th className='w-1/6'>Class</th>
            <th className='w-1/6'>Subject</th>
            <th className='w-1/6'>Semester</th>
            <th className='w-1/6'>Score</th>
            <th className='w-1/6'>Action</th>
          </tr>
        </thead>
        <tbody>
          {scoreList.map((item) => (
            <ScoreListItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
