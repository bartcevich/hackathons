'use client';

import React from 'react';
import { FixedSizeList } from 'react-window';
import styles from './styles.module.scss';

const LANGUAGE_OPTIONS = [
  { ID: '000', text: 'Правительство России задумало вернуть налог на движимое имущество' },
  { ID: '001', text: 'Правительство России задумало вернуть налог на движимое имущество' },
  { ID: '002', text: 'Правительство России задумало вернуть налог на движимое имущество' },
  { ID: '003', text: 'Правительство России задумало вернуть налог на движимое имущество' },
  { ID: '004', text: 'Правительство России задумало вернуть налог на движимое имущество' },
  { ID: '005', text: 'Правительство России задумало вернуть налог на движимое имущество' },
  { ID: '006', text: 'Правительство России задумало вернуть налог на движимое имущество' },
  { ID: '007', text: 'Правительство России задумало вернуть налог на движимое имущество' },
  { ID: '008', text: 'Правительство России задумало вернуть налог на движимое имущество' },
  { ID: '009', text: 'Правительство России задумало вернуть налог на движимое имущество' },
];

interface RowProps {
  index: number;
  style: React.CSSProperties;
}

const Row: React.FC<RowProps> = ({ index, style }) => (
  <div style={style}>
    {LANGUAGE_OPTIONS[index].text}
  </div>
);

export default function Form() {
  return (
    <div className={styles.containerForm}>
      <FixedSizeList
        height={100}
        width={400}
        itemCount={LANGUAGE_OPTIONS.length}
        itemSize={50}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}
