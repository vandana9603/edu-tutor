import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Users, BarChart3, Settings, Home, User, Clock, CheckCircle, XCircle, Trophy, Target, TrendingUp, Calendar } from 'lucide-react';

const EduTutorAI = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole, setUserRole] = useState('student'); // 'student' or 'educator'
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Sample data
  const sampleQuizzes = [
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Linear Equations',
      difficulty: 'Intermediate',
      questions: 12,
      timeEstimate: '15 min',
      lastAttempt: '2 days ago',
      bestScore: 85
    },
    {
      id: 2,
      subject: 'Science',
      topic: 'Photosynthesis',
      difficulty: 'Beginner',
      questions: 8,
      timeEstimate: '10 min',
      lastAttempt: 'Never',
      bestScore: null
    },
    {
      id: 3,
      subject: 'History',
      topic: 'World War II',
      difficulty: 'Advanced',
      questions: 15,
      timeEstimate: '20 min',
      lastAttempt: '1 week ago',
      bestScore: 92
    }
  ];

  const sampleStudents = [
    { id: 1, name: 'Alice Johnson', lastActive: '2 hours ago', avgScore: 87, quizzesCompleted: 24, currentTopic: 'Algebra' },
    { id: 2, name: 'Bob Smith', lastActive: '1 day ago', avgScore: 76, quizzesCompleted: 18, currentTopic: 'Biology' },
    { id: 3, name: 'Carol Davis', lastActive: '3 hours ago', avgScore: 94, quizzesCompleted: 31, currentTopic: 'History' },
    { id: 4, name: 'David Wilson', lastActive: '5 hours ago', avgScore: 82, quizzesCompleted: 22, currentTopic: 'Physics' }
  ];

  const sampleQuizData = {
    subject: 'Mathematics',
    topic: 'Linear Equations',
    questions: [
      {
        question: "What is the slope of the line y = 3x + 5?",
        options: ["3", "5", "-3", "8"],
        correct: 0,
        explanation: "In the equation y = mx + b, 'm' represents the slope. Here, m = 3."
      },
      {
        question: "Solve for x: 2x + 6 = 14",
        options: ["x = 2", "x = 4", "x = 6", "x = 8"],
        correct: 1,
        explanation: "Subtract 6 from both sides: 2x = 8, then divide by 2: x = 4."
      },
      {
        question: "Which point lies on the line y = 2x - 1?",
        options: ["(0, 1)", "(1, 1)", "(2, 3)", "(3, 5)"],
        correct: 2,
        explanation: "Substitute x = 2: y = 2(2) - 1 = 4 - 1 = 3. So (2, 3) is on the line."
      }
    ]
  };

  const startQuiz = (quiz) => {
    setCurrentQuiz(sampleQuizData);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setActiveView('quiz');
  };

  const submitAnswer = () => {
    const isCorrect = parseInt(selectedAnswer) === currentQuiz.questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setQuizComplete(true);
    }
  };

  const StudentDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Student!</h2>
        <p className="text-blue-100">Continue your personalized learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center space-x-3">
            <Trophy className="text-yellow-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Overall Score</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center space-x-3">
            <Target className="text-green-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Quizzes Completed</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-blue-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Study Streak</p>
              <p className="text-2xl font-bold">7 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold flex items-center">
            <Brain className="mr-2 text-purple-600" size={24} />
            AI-Generated Quizzes
          </h3>
          <p className="text-gray-600 mt-1">Personalized based on your learning progress</p>
        </div>
        <div className="p-6 space-y-4">
          {sampleQuizzes.map((quiz) => (
            <div key={quiz.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{quiz.topic}</h4>
                  <p className="text-gray-600">{quiz.subject}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center">
                  <BookOpen size={16} className="mr-1" />
                  {quiz.questions} questions
                </span>
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {quiz.timeEstimate}
                </span>
                {quiz.bestScore && (
                  <span className="flex items-center">
                    <Trophy size={16} className="mr-1" />
                    Best: {quiz.bestScore}%
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Last attempt: {quiz.lastAttempt}</p>
                <button
                  onClick={() => startQuiz(quiz)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const EducatorDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Educator Dashboard</h2>
        <p className="text-green-100">Monitor student progress and performance insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center space-x-3">
            <Users className="text-blue-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center space-x-3">
            <BarChart3 className="text-green-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Avg Class Score</p>
              <p className="text-2xl font-bold">82%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-purple-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Quizzes Created</p>
              <p className="text-2xl font-bold">48</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center space-x-3">
            <Calendar className="text-orange-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Active Today</p>
              <p className="text-2xl font-bold">89</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">Student Performance Overview</h3>
          <p className="text-gray-600 mt-1">Real-time insights from Google Classroom integration</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Student</th>
                  <th className="text-left py-2">Last Active</th>
                  <th className="text-left py-2">Avg Score</th>
                  <th className="text-left py-2">Quizzes</th>
                  <th className="text-left py-2">Current Topic</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600">{student.lastActive}</td>
                    <td className="py-3">
                      <span className={`font-semibold ${
                        student.avgScore >= 90 ? 'text-green-600' :
                        student.avgScore >= 80 ? 'text-blue-600' :
                        student.avgScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {student.avgScore}%
                      </span>
                    </td>
                    <td className="py-3">{student.quizzesCompleted}</td>
                    <td className="py-3">{student.currentTopic}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const QuizInterface = () => {
    if (!quizStarted) return null;

    if (quizComplete) {
      const percentage = Math.round((score / currentQuiz.questions.length) * 100);
      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              {percentage >= 80 ? (
                <CheckCircle className="mx-auto text-green-500" size={64} />
              ) : (
                <Target className="mx-auto text-blue-500" size={64} />
              )}
            </div>
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl mb-6">
              You scored <span className="font-bold text-blue-600">{score}/{currentQuiz.questions.length}</span> ({percentage}%)
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">AI Feedback:</h3>
              <p className="text-gray-700">
                {percentage >= 80 
                  ? "Excellent work! You have a strong understanding of linear equations. Consider trying more advanced topics."
                  : percentage >= 60
                  ? "Good effort! Review the concepts you missed and try some practice problems to improve."
                  : "Keep practicing! Focus on the fundamentals and don't hesitate to ask for help."
                }
              </p>
            </div>
            <button
              onClick={() => {
                setActiveView('dashboard');
                setQuizStarted(false);
                setCurrentQuiz(null);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
    }

    const question = currentQuiz.questions[currentQuestion];
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {currentQuiz.questions.length}
              </span>
              <span className="text-sm text-gray-600">
                {currentQuiz.subject} - {currentQuiz.topic}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={selectedAnswer === index.toString()}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <button
            onClick={submitAnswer}
            disabled={selectedAnswer === ''}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Brain className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">EduTutor AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="student">Student View</option>
                <option value="educator">Educator View</option>
              </select>
              <div className="flex items-center space-x-2">
                <User className="text-gray-600" size={20} />
                <span className="text-gray-700">{userRole === 'student' ? 'John Doe' : 'Ms. Smith'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home size={16} className="inline mr-2" />
              Dashboard
            </button>
            {userRole === 'student' && (
              <button
                onClick={() => setActiveView('quiz')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeView === 'quiz'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BookOpen size={16} className="inline mr-2" />
                Quizzes
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' && (userRole === 'student' ? <StudentDashboard /> : <EducatorDashboard />)}
        {activeView === 'quiz' && <QuizInterface />}
      </main>
    </div>
  );
};

export default EduTutorAI;