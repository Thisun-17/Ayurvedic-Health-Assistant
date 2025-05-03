import React, { useState } from 'react';
import '../styles/Practitioners.css';

function Practitioners() {
  const [location, setLocation] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);
  
  // Mock data for practitioners
  const mockPractitioners = [
    {
      id: 1,
      name: 'Dr. Ayush Sharma',
      specialization: ['Panchakarma', 'Digestive Health'],
      experience: '15 years',
      location: 'Mumbai, India',
      rating: 4.9,
      about: 'Dr. Sharma is an expert in traditional Ayurvedic treatments with focus on digestive health. He combines ancient wisdom with modern scientific approach.',
      education: 'BAMS, MD (Ayurveda) - Mumbai University',
      contact: {
        email: 'dr.sharma@example.com',
        phone: '+91 98765 43210'
      }
    },
    {
      id: 2,
      name: 'Dr. Maya Patel',
      specialization: ['Women\'s Health', 'Stress Management'],
      experience: '12 years',
      location: 'New Delhi, India',
      rating: 4.7,
      about: 'Dr. Patel specializes in women\'s health and stress management through Ayurvedic principles, offering personalized treatment plans.',
      education: 'BAMS - Gujarat Ayurved University, PhD in Ayurvedic Gynecology',
      contact: {
        email: 'dr.patel@example.com',
        phone: '+91 95678 12345'
      }
    },
    {
      id: 3,
      name: 'Dr. Rahul Verma',
      specialization: ['Skin Care', 'Respiratory Health'],
      experience: '10 years',
      location: 'Bengaluru, India',
      rating: 4.8,
      about: 'Dr. Verma focuses on Ayurvedic approaches to skin conditions and respiratory issues, with expertise in herbal formulations.',
      education: 'BAMS, MS (Ayurveda) - Rajiv Gandhi University',
      contact: {
        email: 'dr.verma@example.com',
        phone: '+91 87654 32109'
      }
    },
    {
      id: 4,
      name: 'Dr. Anika Singh',
      specialization: ['Joint Pain', 'Chronic Conditions'],
      experience: '18 years',
      location: 'Pune, India',
      rating: 4.9,
      about: 'Dr. Singh has extensive experience treating chronic conditions and joint pain using traditional Ayurvedic methodologies.',
      education: 'BAMS - Banaras Hindu University, PhD in Kayachikitsa',
      contact: {
        email: 'dr.singh@example.com',
        phone: '+91 76543 21098'
      }
    }
  ];
  
  const specializations = [
    'Panchakarma', 'Digestive Health', 'Women\'s Health', 
    'Stress Management', 'Skin Care', 'Joint Pain', 
    'Respiratory Health', 'Chronic Conditions'
  ];
  
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const handleSearch = () => {
    setIsSearching(true);
    
    // In a real application, this would be an API call
    setTimeout(() => {
      let results = [...mockPractitioners];
      
      if (location.trim() !== '') {
        const searchTerm = location.toLowerCase().trim();
        results = results.filter(practitioner => 
          practitioner.location.toLowerCase().includes(searchTerm)
        );
      }
      
      if (activeFilters.length > 0) {
        results = results.filter(practitioner => 
          practitioner.specialization.some(spec => 
            activeFilters.includes(spec)
          )
        );
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000); // Simulate API delay
  };
  
  const viewPractitionerDetails = (practitioner) => {
    setSelectedPractitioner(practitioner);
  };
  
  const closeDetails = () => {
    setSelectedPractitioner(null);
  };

  return (
    <div className="practitioners-page">
      <h1>Find Ayurvedic Practitioners</h1>
      <p>Connect with certified Ayurvedic health professionals in your area.</p>
      
      <div className="search-section">
        <input 
          type="text" 
          placeholder="Enter location (city, state)" 
          className="location-search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button 
          className="search-button"
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      <div className="filter-options">
        <p><strong>Specialization:</strong></p>
        {specializations.map((spec, index) => (
          <div 
            key={index} 
            className={`filter-option ${activeFilters.includes(spec) ? 'active' : ''}`}
            onClick={() => toggleFilter(spec)}
          >
            {spec}
          </div>
        ))}
      </div>
      
      {selectedPractitioner ? (
        <div className="practitioner-details">
          <button className="back-button" onClick={closeDetails}>
            &larr; Back to search results
          </button>
          
          <div className="practitioner-profile">
            <div className="profile-header">
              <div className="profile-image-placeholder"></div>
              <div className="profile-header-info">
                <h2>{selectedPractitioner.name}</h2>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(selectedPractitioner.rating) ? "★" : "☆"}
                    </span>
                  ))}
                  <span> {selectedPractitioner.rating}/5</span>
                </div>
                <p><strong>Experience:</strong> {selectedPractitioner.experience}</p>
                <p><strong>Location:</strong> {selectedPractitioner.location}</p>
              </div>
            </div>
            
            <div className="profile-section">
              <h3>About</h3>
              <p>{selectedPractitioner.about}</p>
            </div>
            
            <div className="profile-section">
              <h3>Specializations</h3>
              <div className="specialization-tags">
                {selectedPractitioner.specialization.map((spec, index) => (
                  <span className="specialization-tag" key={index}>{spec}</span>
                ))}
              </div>
            </div>
            
            <div className="profile-section">
              <h3>Education</h3>
              <p>{selectedPractitioner.education}</p>
            </div>
            
            <div className="profile-section">
              <h3>Contact Information</h3>
              <p>Email: {selectedPractitioner.contact.email}</p>
              <p>Phone: {selectedPractitioner.contact.phone}</p>
            </div>
            
            <div className="action-buttons">
              <button className="contact-button">Book Appointment</button>
              <button className="secondary-button">Send Message</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="practitioners-list">
          <h2>
            {searchResults.length > 0 
              ? 'Search Results' 
              : 'Featured Practitioners'}
          </h2>
          
          {searchResults.length > 0 ? (
            searchResults.map(practitioner => (
              <div className="practitioner-card" key={practitioner.id}>
                <div className="practitioner-image-placeholder"></div>
                <h3>{practitioner.name}</h3>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(practitioner.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p><strong>Specializes in:</strong> {practitioner.specialization.join(', ')}</p>
                <p><strong>Experience:</strong> {practitioner.experience}</p>
                <p><strong>Location:</strong> {practitioner.location}</p>
                <button 
                  className="contact-button"
                  onClick={() => viewPractitionerDetails(practitioner)}
                >
                  View Profile
                </button>
              </div>
            ))
          ) : (
            // Display featured practitioners (mock data)
            mockPractitioners.map(practitioner => (
              <div className="practitioner-card" key={practitioner.id}>
                <div className="practitioner-image-placeholder"></div>
                <h3>{practitioner.name}</h3>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(practitioner.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p><strong>Specializes in:</strong> {practitioner.specialization.join(', ')}</p>
                <p><strong>Experience:</strong> {practitioner.experience}</p>
                <p><strong>Location:</strong> {practitioner.location}</p>
                <button 
                  className="contact-button"
                  onClick={() => viewPractitionerDetails(practitioner)}
                >
                  View Profile
                </button>
              </div>
            ))
          )}
        </div>
      )}
      
      <div className="map-container">
        <p style={{textAlign: 'center', padding: '2rem'}}>
          Map integration will be displayed here
        </p>
      </div>
    </div>
  );
}

export default Practitioners;