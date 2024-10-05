import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Input from './Input';
import { BsEmojiAngryFill, BsEmojiFrownFill, BsEmojiNeutralFill, BsEmojiSmileFill, BsEmojiLaughingFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyForm = () => {
  const [hoveredEmoji, setHoveredEmoji] = useState(null);
  const [input, setInput] = useState({});
  const [Data, setData] = useState([]);

  const data = [
    { type: "text", name: "firstName", label: "First Name", placeholder: "Enter your first name" },
    { type: "email", name: "email", label: "Email Address", placeholder: "Enter your email address" },
    { type: "number", name: "contact", label: "Contact Number", placeholder: "Enter your Contact Number" },
  ];
  
  const emoji = [
    { icon: <BsEmojiAngryFill />, color: 'red', defaultColor: 'gray', name: 'Very Poor' },
    { icon: <BsEmojiFrownFill />, color: 'orange', defaultColor: 'gray', name: 'Poor' },
    { icon: <BsEmojiNeutralFill />, color: 'yellow', defaultColor: 'gray', name: 'Good' },
    { icon: <BsEmojiSmileFill />, color: 'lightgreen', defaultColor: 'gray', name: 'Very Good' },
    { icon: <BsEmojiLaughingFill />, color: 'green', defaultColor: 'gray', name: 'Excellent' }
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData, [name]: value
    }));
  };

  const handleEmojiHover = (index) => {
    setHoveredEmoji(index);
  };

  const handleEmojiClick = (index) => {
    const name = emoji[index].name;
    setInput((data) => ({
      ...data, Rating: name
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let existingData = JSON.parse(localStorage.getItem('data')) || [];
    let newData = [...existingData, input];
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));

    console.log(newData);
  };

  return (
    <Form className='p-5 shadow-lg rounded' style={{ backgroundColor: '#fff', maxWidth: '600px', margin: 'auto' }} onSubmit={handleSubmit}>
      <h2 className='text-center mb-4' style={{ fontWeight: 'bold', color: '#333' }}>Feedback Form</h2>

      <div className="d-flex flex-wrap justify-content-between">
        {data.slice(0, 2).map((val, key) => (
          <Input 
            key={key} 
            type={val.type} 
            name={val.name} 
            placeholder={val.placeholder} 
            label={val.label} 
            onChange={handleInput} 
            className="mb-3" 
            style={{ flex: '0 0 48%' }}
          />
        ))}
      </div>

      {data.slice(2).map((val, key) => (
        <Input key={key + 2} type={val.type} name={val.name} placeholder={val.placeholder} label={val.label} onChange={handleInput} className="mb-3" />
      ))}

      <Form.Group className='mb-4'>
        <Form.Label className='fw-bold'>Rate your experience</Form.Label>
        <div className="d-flex justify-content-center my-2">
          {emoji.map((emojiVal, emojiKey) => (
            <div
              className="mx-2"
              key={emojiKey}
              onMouseEnter={() => handleEmojiHover(emojiKey)}
              onMouseLeave={() => handleEmojiHover(null)}
              onClick={() => handleEmojiClick(emojiKey)}
              style={{ cursor: 'pointer' }}
            >
              {React.cloneElement(emojiVal.icon, {
                color: hoveredEmoji === emojiKey ? emojiVal.color : emojiVal.defaultColor,
                size: 40
              })}
            </div>
          ))}
        </div>
      </Form.Group>

      <Form.Group className='mb-4'>
        <Form.Label className='fw-bold'>Feedback</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={2} 
          placeholder="Please provide your feedback here..." 
          onChange={handleInput} 
          name='Feedback' 
          style={{ padding: '5px', fontSize: '12px', borderRadius: '4px' }}
        />
      </Form.Group>

      <div className="d-flex justify-content-center">
        <Button className='mx-2' type='submit' variant="secondary" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Submit...
        </Button>
        <Link className='mx-2' to="/table">
          <Button variant="outline-secondary" style={{ padding: '10px 20px', fontSize: '16px' }}>Show Data</Button>
        </Link>
      </div>
    </Form>
  );
};

export default MyForm;
