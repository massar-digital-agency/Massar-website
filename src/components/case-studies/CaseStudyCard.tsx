// src/components/case-studies/CaseStudyCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  tags?: string[];
}

const CaseStudyCard: React.FC<{ caseStudy: CaseStudy }> = ({ caseStudy }) => {
  return (
    <Link
      to={`/case-studies/${caseStudy.slug}`}
      className="group block bg-white bg-opacity-10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
        <img
          src={caseStudy.thumbnail}
          alt={caseStudy.title}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 text-white">
        <h2 className="text-xl font-semibold mb-2">{caseStudy.title}</h2>
        <p className="text-sm mb-3 line-clamp-2">{caseStudy.excerpt}</p>
        {caseStudy.tags && (
          <div className="flex flex-wrap gap-1">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white bg-opacity-20 rounded-full px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CaseStudyCard;
