import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TopPerformersRanking = ({ activeTab }) => {
  const generatePerformers = (tab) => {
    const performerData = {
      farmers: [
        {
          id: 1,
          name: "Green Valley Farms",
          location: "California, USA",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
          score: 98.5,
          submissions: 1247,
          verificationRate: 99.2,
          badge: "gold",
        },
        {
          id: 2,
          name: "Sunrise Agriculture",
          location: "Texas, USA",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          score: 96.8,
          submissions: 1156,
          verificationRate: 97.8,
          badge: "gold",
        },
        {
          id: 3,
          name: "Prairie Harvest Co.",
          location: "Iowa, USA",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          score: 94.2,
          submissions: 987,
          verificationRate: 96.1,
          badge: "silver",
        },
        {
          id: 4,
          name: "Mountain View Organic",
          location: "Colorado, USA",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
          score: 92.7,
          submissions: 834,
          verificationRate: 94.5,
          badge: "silver",
        },
        {
          id: 5,
          name: "Coastal Crops Ltd.",
          location: "Florida, USA",
          avatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
          score: 90.3,
          submissions: 756,
          verificationRate: 92.8,
          badge: "bronze",
        },
      ],
      "lab-testers": [
        {
          id: 1,
          name: "AgriTest Solutions",
          location: "New York, USA",
          avatar:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
          score: 99.1,
          submissions: 2847,
          verificationRate: 99.8,
          badge: "gold",
        },
        {
          id: 2,
          name: "Quality Labs Inc.",
          location: "Illinois, USA",
          avatar:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150",
          score: 97.6,
          submissions: 2234,
          verificationRate: 98.9,
          badge: "gold",
        },
        {
          id: 3,
          name: "Precision Testing",
          location: "Ohio, USA",
          avatar:
            "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150",
          score: 95.8,
          submissions: 1987,
          verificationRate: 97.2,
          badge: "silver",
        },
        {
          id: 4,
          name: "BioAnalytics Corp",
          location: "Michigan, USA",
          avatar:
            "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150",
          score: 94.3,
          submissions: 1756,
          verificationRate: 96.1,
          badge: "silver",
        },
        {
          id: 5,
          name: "Advanced Testing",
          location: "Wisconsin, USA",
          avatar:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
          score: 92.7,
          submissions: 1543,
          verificationRate: 94.8,
          badge: "bronze",
        },
      ],
      processors: [
        {
          id: 1,
          name: "Premier Processing",
          location: "Kansas, USA",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          score: 97.2,
          submissions: 15678,
          verificationRate: 98.5,
          badge: "gold",
        },
        {
          id: 2,
          name: "Harvest Industries",
          location: "Nebraska, USA",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          score: 95.8,
          submissions: 13456,
          verificationRate: 97.1,
          badge: "gold",
        },
        {
          id: 3,
          name: "AgriProcess Corp",
          location: "Minnesota, USA",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
          score: 93.4,
          submissions: 11234,
          verificationRate: 95.6,
          badge: "silver",
        },
        {
          id: 4,
          name: "Valley Processing",
          location: "North Dakota, USA",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
          score: 91.7,
          submissions: 9876,
          verificationRate: 93.8,
          badge: "silver",
        },
        {
          id: 5,
          name: "Midwest Mills",
          location: "South Dakota, USA",
          avatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
          score: 89.3,
          submissions: 8543,
          verificationRate: 91.9,
          badge: "bronze",
        },
      ],
      manufacturers: [
        {
          id: 1,
          name: "Global Food Corp",
          location: "California, USA",
          avatar:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
          score: 96.8,
          submissions: 45678,
          verificationRate: 98.2,
          badge: "gold",
        },
        {
          id: 2,
          name: "Premium Products",
          location: "New York, USA",
          avatar:
            "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150",
          score: 94.5,
          submissions: 38765,
          verificationRate: 96.7,
          badge: "gold",
        },
        {
          id: 3,
          name: "Quality Manufacturing",
          location: "Texas, USA",
          avatar:
            "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150",
          score: 92.1,
          submissions: 32456,
          verificationRate: 94.8,
          badge: "silver",
        },
        {
          id: 4,
          name: "Elite Food Systems",
          location: "Illinois, USA",
          avatar:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150",
          score: 90.7,
          submissions: 28934,
          verificationRate: 92.9,
          badge: "silver",
        },
        {
          id: 5,
          name: "Apex Manufacturing",
          location: "Florida, USA",
          avatar:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
          score: 88.4,
          submissions: 25678,
          verificationRate: 90.6,
          badge: "bronze",
        },
      ],
    };

    return performerData?.[tab] || performerData?.farmers;
  };

  const performers = generatePerformers(activeTab);

  const getBadgeColor = (badge) => {
    const colors = {
      gold: "text-yellow-600 bg-yellow-50",
      silver: "text-gray-600 bg-gray-50",
      bronze: "text-orange-600 bg-orange-50",
    };
    return colors?.[badge] || colors?.bronze;
  };

  const getBadgeIcon = (badge) => {
    const icons = {
      gold: "Crown",
      silver: "Award",
      bronze: "Medal",
    };
    return icons?.[badge] || icons?.bronze;
  };

  return <></>;
};

export default TopPerformersRanking;
