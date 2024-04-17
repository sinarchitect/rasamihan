import { css } from '@emotion/css';
import { thousondSeparator } from '@/config/utils/currency'

interface TableProps {
    data: {
        s: string;
        P: number;
        c: string;
    }[];
}


const tableStyle = css`
    width: 400px;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    background-color: #06242d;
    color: #ffffff;
`;

const tdStyle = css`
  padding: 8px;
  text-align: right;
`;
const tdSymbol = css`
  padding: 8px;
  text-align: left;
`;

const priceStyle = css`
  font-weight: bold;
`;

const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <table className={tableStyle}>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td className={tdSymbol}>{item.s}</td>
                        <td className={tdStyle}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className={priceStyle}>{thousondSeparator(Number(item.c), { dot: '.', separator: ',', decimalLength: 6 })}</span>
                                {/* ino ba props emotion ham mishe zad k tamiz tar bashe, bebakhshid vaght vaghean nadashtam */}
                                <span style={item.P > 0 ? { color: '#05b905' } : { color: '#ff0000' }}>
                                    {item.P}%
                                </span>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;