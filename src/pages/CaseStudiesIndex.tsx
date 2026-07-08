import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import CaseStudyFilters from '@/components/case-studies/CaseStudyFilters';
import CaseStudyPagination from '@/components/case-studies/CaseStudyPagination';
import caseStudies from '@/content/case-studies/index.json';

const ITEMS_PER_PAGE = 9;

const CaseStudiesIndex: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // derive all tags from data
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    caseStudies.forEach((cs: any) => cs.tags?.forEach((t: string) => tagSet.add(t)));
    return Array.from(tagSet);
  }, []);

  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return caseStudies;
    return caseStudies.filter((cs: any) =>
      cs.tags && selectedTags.every((tag) => cs.tags.includes(tag))
    );
  }, [selectedTags]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handleTagToggle = (tag: string) => {
    setCurrentPage(1);
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <Helmet>
        <title>Case Studies – Massar Agency</title>
        <meta name="description" content="Explore our successful projects and case studies across industries." />
      </Helmet>
      <section className="case-studies-section py-12 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Case Studies</h1>
        <CaseStudyFilters
          tags={allTags}
          selectedTags={selectedTags}
          onToggleTag={handleTagToggle}
        />
        <div className="case-study-grid mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {paginated.map((cs: any) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
        <CaseStudyPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
};

export default CaseStudiesIndex;
