import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [isAscending, setIsAscending] = useState(true); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [rowsPerPage] = useState(5); 

    const searchData = ['firstName', 'email', 'contact', 'Rating', 'Feedback'];

    useEffect(() => {
        const oldData = JSON.parse(localStorage.getItem('data')) || [];
        setData(oldData);
    }, []);

    const handleInput = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);
    };

    const handleFilter = () => {
        const sortedData = [...data].sort((a, b) =>
            isAscending ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName)
        );
        setData(sortedData);
        setIsAscending(!isAscending); 
    };

    const handleDelete = (indexToDelete) => {
        const newData = data.filter((_, index) => index !== indexToDelete);
        setData(newData);
        localStorage.setItem('data', JSON.stringify(newData)); 
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            {/* Adding the 'form-control-sm' class to make the input smaller */}
            <Input 
                type={"search"} 
                name={"search"} 
                onChange={handleInput} 
                label={"Search"} 
                className="form-control-sm" // Bootstrap class for small form control
            />
            <Link to="/"><Button style={{ margin: '5px 10px' }} className='mb-3n' variant='secondary'>Add Data</Button></Link>
            <Button variant='secondary' onClick={handleFilter}>
                Filter {isAscending ? <FaCaretDown /> : <FaCaretUp />}
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>  
                        <th>No.</th> 
                        {searchData.map((val, key) => (
                            <th key={key}>{val}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData
                        .filter((val) => searchData.some((key) =>
                            val[key]?.toString().toLowerCase().includes(search)
                        ))
                        .map((item, index) => (
                            <tr key={index}>
                                <td>{indexOfFirstRow + index + 1 }</td>
                                {searchData.map((key, i) => (
                                    <td key={i}>{item[key]}</td>
                                ))}
                                <td>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleDelete(indexOfFirstRow + index)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                    variant="secondary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{ marginRight: '10px' }}
                >
                    Previous
                </Button>
                <span style={{ alignSelf: 'center' }}>
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{ marginLeft: '10px' }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default DataTable;
