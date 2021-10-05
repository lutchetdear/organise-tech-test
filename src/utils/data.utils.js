export const filterData = (workplaceFilter, employmentStatusFilter, data) => {
  return data.filter((item) => {
    const {
      member: { employment_status, workplace },
    } = item;

    let isEmploymentMatch = employment_status === employmentStatusFilter;
    if (employmentStatusFilter === "all") isEmploymentMatch = true;

    let isWorkplaceMatch =
      workplace?.name.toLowerCase().match(workplaceFilter.toLowerCase()) ||
      (workplaceFilter === "" && workplace === null);

    return isEmploymentMatch && isWorkplaceMatch;
  });
};
