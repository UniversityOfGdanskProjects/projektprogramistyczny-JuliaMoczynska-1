import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Layout from '../../Layout/Layout';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { UserContext } from '../../Context/Context'; 

const MovieForm = () => {
  const { userInfo } = useContext(UserContext); 
  const [socket, setSocket] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
  };

  const handleSubmitFeedback = () => {
    if (socket && Object.keys(answers).length === questions.length) {
      socket.emit('submit-feedback', { answers, userEmail: userInfo.email }); 
    } else {
      console.log('Please answer all questions before submitting.');
    }
  };

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('feedback-questions', (questions) => {
      setQuestions(questions);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('feedback-submitted', ({ success, message }) => {
        if (success) {
          setFormSubmitted(true);
        } else {
          if (message === 'User already submitted feedback.') {
            setFormError(true);
          }
          console.log(message);
        }
      });
    }
  }, [socket]);

  return (
    <Layout>
      <div className="container mx-auto mt-8 max-w-3xl">
        {formSubmitted ? (
          <div className="text-center text-white flex items-center justify-center">
            <FaCheckCircle className="text-5xl text-green-500 mr-2" /> 
            <div>
              <p className="text-2xl font-bold mb-2">Thank you for filling out the feedback form!</p>
            </div>
          </div>
        ) : formError ? (
          <div className="text-center text-white flex items-center justify-center">
            <FaExclamationCircle className="text-red-500 text-4xl" />
            <div>
              <p className="text-2xl font-bold mb-2">You have already filled out this feedback form.</p>
            </div>
          </div>
      ) :(
          <div className="border border-border p-4 mb-4 rounded-lg bg-dry">
            <h3 className="text-2xl font-bold mb-4 text-white">Website Feedback Form</h3>
            <div className="questions-container">
              <ul>
                {questions.map((question) => (
                  <li key={question.id} className="mb-6">
                    <p className="text-lg font-semibold mb-2 text-white">{question.text}</p>
                    <div className="flex flex-col">
                      <textarea
                        id={`q${question.id}`}
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        rows="4"
                        className="bg-gray-700 text-white p-2 rounded"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={handleSubmitFeedback} className="bg-main transitions hover:bg-subMain text-white px-4 py-2 rounded">Submit Feedback</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MovieForm;
