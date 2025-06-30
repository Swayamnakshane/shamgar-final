// src/components/ExamInstructions.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ExamInstructions = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    axios.get("http://3.133.147.40:5000/candidate/profile", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const { exam_duration } = res.data;
      const mins = exam_duration;
      const h = Math.floor(mins / 60), m = mins % 60;
      res.data.formattedDuration = `${h > 0 ? h + 'h ' : ''}${m}m`;

      setProfile(res.data);
    }).catch(() => navigate("/"));
  }, [navigate]);

  const sessionId = "EXM" + Math.floor(100000 + Math.random() * 900000);
  const handleStartExam = async () => {
  const token = localStorage.getItem("token");
  if (!token) return navigate("/");

  try {
    const res = await axios.post("http://3.133.147.40:5000/candidate/start_exam", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.data.message === "Exam already started." || res.data.message === "Exam started.") {
      navigate("/exam");
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Session expired or error starting exam.");
    navigate("/");
  }
};


  return (
    <div className="container py-5 bg-light min-vh-100">
      <div className="card mx-auto shadow-lg" style={{ maxWidth: "800px" }}>
        <img
          src="/assets/exam-banner.jpg"
          className="card-img-top"
          alt="Exam Banner"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">
              <i className="bi bi-journal-code me-2"></i>
              {profile.batch_title || 'Assessment Portal'}
            </h5>
            <small>Candidate: <strong>{profile.candidate_name}</strong></small><br/>
            <small>Exam Dates: <strong>{profile.exam_start_date} – {profile.exam_end_date}</strong></small>
          </div>
          <div className="text-end">
            <small>Session ID: <strong>{sessionId}</strong></small><br/>
            <small>Duration: <strong>{profile.formattedDuration}</strong></small>
          </div>
        </div>

        <div className="card-body">
          <h4 className="text-warning mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Examination Instructions
          </h4>

          <div className="row">
            <div className="col-md-6">
              <h6><i className="bi bi-clock me-2 text-primary"></i>Time Guidelines</h6>
              <ul>
                <li><strong>Total duration:</strong> {profile.formattedDuration}</li>
                <li><strong>Auto‑submit</strong> at end time</li>
                <li><strong>Timer</strong> always visible</li>
              </ul>
            </div>

            <div className="col-md-6">
              <h6><i className="bi bi-list-ol me-2 text-primary"></i>Question Structure</h6>
              <ul>
                <li><strong>40 MCQs</strong></li>
                <li><strong>Easy:</strong> 40%</li>
                <li><strong>Medium:</strong> 30%</li>
                <li><strong>Hard:</strong> 30%</li>
              </ul>
            </div>
          </div>

          <div className="alert alert-danger mt-4">
            <h6><i className="bi bi-shield-lock-fill me-2"></i>Strict Examination Rules</h6>
            <ul>
              <li>No tab switching – monitored</li>
              <li>No external resources</li>
              <li>No screenshot/recording</li>
              <li>No communication (calls/chat)</li>
              <li>Webcam monitoring (if enabled)</li>
              <li>Single attempt only</li>
            </ul>
          </div>

          <div className="alert alert-info">
            <h6><i className="bi bi-check-circle-fill me-2"></i>Answer Status Indicators</h6>
            <ul>
              <li><span className="text-success">Green:</span> Saved</li>
              <li><span className="text-warning">Yellow:</span> Selected, not saved</li>
              <li><span className="text-danger">Red:</span> Not attempted</li>
            </ul>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left"></i> Back to Login
          </button>
            <button className="btn btn-success" onClick={handleStartExam}>
              <i className="bi bi-play-fill"></i> Start Examination
            </button>

        </div>
      </div>
    </div>
  );
};

export default ExamInstructions;
