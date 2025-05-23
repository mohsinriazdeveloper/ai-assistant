const graphCPI_data = {
  error_message: null,
  recent_exchange_rates: null,
  recent_cpi_rates: {
    groupDetail: {
      label: "Consumer Price Index",
      description:
        "Includes CPI-trim, CPI-median, and CPI-common as well as other “core” inflation measures.",
      link: "https://www.bankofcanada.ca/?p=39863",
    },
    terms: {
      url: "https://www.bankofcanada.ca/terms/",
    },
    seriesDetail: {
      V41690973: {
        label: "Total CPI",
        description: "Total CPI",
        dimension: {
          key: "d",
          name: "Date",
        },
      },
      V41690914: {
        label: "Total CPI, (seasonally adjusted)",
        description: "Total CPI, (seasonally adjusted)",
        dimension: {
          key: "d",
          name: "Date",
        },
      },
      STATIC_TOTALCPICHANGE: {
        label: "Total CPI, Percentage Change over 1 year ago (unadjusted)",
        description:
          "Total CPI, Percentage Change over 1 year ago (unadjusted)",
        dimension: {
          key: "d",
          name: "Date",
        },
      },
      CPI_TRIM: {
        label: "CPI-trim",
        description: "CPI-trim",
        dimension: {
          key: "d",
          name: "Date",
        },
      },
      CPI_MEDIAN: {
        label: "CPI-median",
        description: "CPI-median",
        dimension: {
          key: "d",
          name: "Date",
        },
      },
      CPI_COMMON: {
        label: "CPI-common",
        description: "CPI-common",
        dimension: {
          key: "d",
          name: "Date",
        },
      },
      ATOM_V41693242: {
        label: "CPIX, Percentage Change over 1 year ago (unadjusted)",
        description:
          "The CPI excluding eight of the most volatile components (fruit, vegetables, gasoline, fuel oil, natural gas, mortgage interest, inter-city transportation and tobacco products) as well as the effect of changes in indirect taxes on the remaining components.",
        dimension: {
          key: "d",
          name: "Date",
        },
      },
      STATIC_CPIXFET: {
        label: "CPI-XFET, Percentage Change over 1 year ago (unadjusted)",
        description:
          "The CPI excluding food, energy and the effect of changes in indirect taxes.",
        dimension: {
          key: "d",
          name: "Date",
        },
      },
      CPIW: {
        label: "CPIW, Percentage Change over 1 year ago (unadjusted)",
        description:
          "CPIW adjusts each CPI basket weight by a factor that is inversely proportional to the component's variability and is adjusted to exclude the effect of changes in indirect taxes.",
        dimension: {
          key: "d",
          name: "Date",
        },
      },
    },
    observations: [
      {
        d: "1995-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "0.6",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "2.2",
        },
        CPI_COMMON: {
          v: "1.1",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "86.6",
        },
        V41690914: {
          v: "86.6",
        },
      },
      {
        d: "1995-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "87.0",
        },
        V41690914: {
          v: "87.0",
        },
      },
      {
        d: "1995-03-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "87.2",
        },
        V41690914: {
          v: "87.2",
        },
      },
      {
        d: "1995-04-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.5",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "87.5",
        },
        V41690914: {
          v: "87.4",
        },
      },
      {
        d: "1995-05-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.9",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.3",
        },
        STATIC_CPIXFET: {
          v: "2.5",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.2",
        },
        V41690973: {
          v: "87.7",
        },
        V41690914: {
          v: "87.7",
        },
      },
      {
        d: "1995-06-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.7",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.3",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "87.7",
        },
        V41690914: {
          v: "87.7",
        },
      },
      {
        d: "1995-07-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "2.5",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "87.9",
        },
        V41690914: {
          v: "87.8",
        },
      },
      {
        d: "1995-08-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "2.6",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "87.7",
        },
        V41690914: {
          v: "87.7",
        },
      },
      {
        d: "1995-09-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "2.5",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "87.8",
        },
        V41690914: {
          v: "87.8",
        },
      },
      {
        d: "1995-10-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.5",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "87.7",
        },
        V41690914: {
          v: "87.8",
        },
      },
      {
        d: "1995-11-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.3",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "88.0",
        },
        V41690914: {
          v: "87.9",
        },
      },
      {
        d: "1995-12-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "87.8",
        },
        V41690914: {
          v: "87.9",
        },
      },
      {
        d: "1996-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "88.0",
        },
        V41690914: {
          v: "88.0",
        },
      },
      {
        d: "1996-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "88.1",
        },
        V41690914: {
          v: "88.1",
        },
      },
      {
        d: "1996-03-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "88.5",
        },
        V41690914: {
          v: "88.5",
        },
      },
      {
        d: "1996-04-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "88.7",
        },
        V41690914: {
          v: "88.7",
        },
      },
      {
        d: "1996-05-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "89.0",
        },
        V41690914: {
          v: "88.9",
        },
      },
      {
        d: "1996-06-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "89.0",
        },
        V41690914: {
          v: "88.9",
        },
      },
      {
        d: "1996-07-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "89.0",
        },
        V41690914: {
          v: "88.9",
        },
      },
      {
        d: "1996-08-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "89.0",
        },
        V41690914: {
          v: "89.0",
        },
      },
      {
        d: "1996-09-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "89.1",
        },
        V41690914: {
          v: "89.1",
        },
      },
      {
        d: "1996-10-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.8",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "89.3",
        },
        V41690914: {
          v: "89.4",
        },
      },
      {
        d: "1996-11-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "89.7",
        },
        V41690914: {
          v: "89.7",
        },
      },
      {
        d: "1996-12-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "89.7",
        },
        V41690914: {
          v: "89.9",
        },
      },
      {
        d: "1997-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "89.9",
        },
        V41690914: {
          v: "90.0",
        },
      },
      {
        d: "1997-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "90.1",
        },
        V41690914: {
          v: "90.1",
        },
      },
      {
        d: "1997-03-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "90.2",
        },
        V41690914: {
          v: "90.2",
        },
      },
      {
        d: "1997-04-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "90.2",
        },
        V41690914: {
          v: "90.2",
        },
      },
      {
        d: "1997-05-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "90.3",
        },
        V41690914: {
          v: "90.2",
        },
      },
      {
        d: "1997-06-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "90.5",
        },
        V41690914: {
          v: "90.3",
        },
      },
      {
        d: "1997-07-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "90.5",
        },
        V41690914: {
          v: "90.4",
        },
      },
      {
        d: "1997-08-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.8",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "90.6",
        },
        V41690914: {
          v: "90.6",
        },
      },
      {
        d: "1997-09-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.0",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "90.6",
        },
        V41690914: {
          v: "90.6",
        },
      },
      {
        d: "1997-10-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.0",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "90.6",
        },
        V41690914: {
          v: "90.6",
        },
      },
      {
        d: "1997-11-01",
        STATIC_TOTALCPICHANGE: {
          v: "0.9",
        },
        CPI_MEDIAN: {
          v: "0.9",
        },
        CPI_TRIM: {
          v: "0.8",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "90.5",
        },
        V41690914: {
          v: "90.5",
        },
      },
      {
        d: "1997-12-01",
        STATIC_TOTALCPICHANGE: {
          v: "0.8",
        },
        CPI_MEDIAN: {
          v: "0.9",
        },
        CPI_TRIM: {
          v: "0.8",
        },
        STATIC_CPIXFET: {
          v: "0.8",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "90.4",
        },
        V41690914: {
          v: "90.6",
        },
      },
      {
        d: "1998-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "90.9",
        },
        V41690914: {
          v: "91.1",
        },
      },
      {
        d: "1998-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "91.0",
        },
        V41690914: {
          v: "91.1",
        },
      },
      {
        d: "1998-03-01",
        V41690914: {
          v: "91.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "0.9",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "91.1",
        },
      },
      {
        d: "1998-04-01",
        V41690914: {
          v: "91.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.9",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "0.9",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "91.0",
        },
      },
      {
        d: "1998-05-01",
        V41690914: {
          v: "91.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "0.9",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "91.3",
        },
      },
      {
        d: "1998-06-01",
        V41690914: {
          v: "91.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "0.9",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "91.4",
        },
      },
      {
        d: "1998-07-01",
        V41690914: {
          v: "91.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "91.4",
        },
      },
      {
        d: "1998-08-01",
        V41690914: {
          v: "91.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.9",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "91.4",
        },
      },
      {
        d: "1998-09-01",
        V41690914: {
          v: "91.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.0",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "91.2",
        },
      },
      {
        d: "1998-10-01",
        V41690914: {
          v: "91.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "91.6",
        },
      },
      {
        d: "1998-11-01",
        V41690914: {
          v: "91.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "91.6",
        },
      },
      {
        d: "1998-12-01",
        V41690914: {
          v: "91.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "91.3",
        },
      },
      {
        d: "1999-01-01",
        V41690914: {
          v: "91.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.0",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "91.5",
        },
      },
      {
        d: "1999-02-01",
        V41690914: {
          v: "91.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.0",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "91.6",
        },
      },
      {
        d: "1999-03-01",
        V41690914: {
          v: "92.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "92.0",
        },
      },
      {
        d: "1999-04-01",
        V41690914: {
          v: "92.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "92.5",
        },
      },
      {
        d: "1999-05-01",
        V41690914: {
          v: "92.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "92.7",
        },
      },
      {
        d: "1999-06-01",
        V41690914: {
          v: "92.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "92.9",
        },
      },
      {
        d: "1999-07-01",
        V41690914: {
          v: "92.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "93.1",
        },
      },
      {
        d: "1999-08-01",
        V41690914: {
          v: "93.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "93.3",
        },
      },
      {
        d: "1999-09-01",
        V41690914: {
          v: "93.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "93.6",
        },
      },
      {
        d: "1999-10-01",
        V41690914: {
          v: "93.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "93.7",
        },
      },
      {
        d: "1999-11-01",
        V41690914: {
          v: "93.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "93.6",
        },
      },
      {
        d: "1999-12-01",
        V41690914: {
          v: "94.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "93.7",
        },
      },
      {
        d: "2000-01-01",
        V41690914: {
          v: "94.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.3",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "93.5",
        },
      },
      {
        d: "2000-02-01",
        V41690914: {
          v: "94.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.7",
        },
        CPI_MEDIAN: {
          v: "1.4",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "94.1",
        },
      },
      {
        d: "2000-03-01",
        V41690914: {
          v: "94.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.0",
        },
        CPI_MEDIAN: {
          v: "1.4",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "94.8",
        },
      },
      {
        d: "2000-04-01",
        V41690914: {
          v: "94.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.4",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "94.5",
        },
      },
      {
        d: "2000-05-01",
        V41690914: {
          v: "94.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "94.9",
        },
      },
      {
        d: "2000-06-01",
        V41690914: {
          v: "95.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "95.5",
        },
      },
      {
        d: "2000-07-01",
        V41690914: {
          v: "95.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.9",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "95.8",
        },
      },
      {
        d: "2000-08-01",
        V41690914: {
          v: "95.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "95.7",
        },
      },
      {
        d: "2000-09-01",
        V41690914: {
          v: "95.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.7",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "96.1",
        },
      },
      {
        d: "2000-10-01",
        V41690914: {
          v: "96.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "96.3",
        },
      },
      {
        d: "2000-11-01",
        V41690914: {
          v: "96.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.2",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "96.6",
        },
      },
      {
        d: "2000-12-01",
        V41690914: {
          v: "97.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.2",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "96.7",
        },
      },
      {
        d: "2001-01-01",
        V41690914: {
          v: "96.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.0",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "2.4",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "96.3",
        },
      },
      {
        d: "2001-02-01",
        V41690973: {
          v: "96.8",
        },
        V41690914: {
          v: "96.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.9",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "1.9",
        },
      },
      {
        d: "2001-03-01",
        V41690973: {
          v: "97.1",
        },
        V41690914: {
          v: "97.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "1.9",
        },
      },
      {
        d: "2001-04-01",
        V41690973: {
          v: "97.8",
        },
        V41690914: {
          v: "97.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.5",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.4",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "2.3",
        },
      },
      {
        d: "2001-05-01",
        V41690973: {
          v: "98.6",
        },
        V41690914: {
          v: "98.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.9",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.4",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "2.5",
        },
      },
      {
        d: "2001-06-01",
        V41690973: {
          v: "98.7",
        },
        V41690914: {
          v: "98.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.4",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.4",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "2.4",
        },
      },
      {
        d: "2001-07-01",
        V41690973: {
          v: "98.4",
        },
        V41690914: {
          v: "98.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.7",
        },
        CPI_MEDIAN: {
          v: "2.3",
        },
        ATOM_V41693242: {
          v: "2.5",
        },
        CPI_TRIM: {
          v: "2.5",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.6",
        },
        CPIW: {
          v: "2.4",
        },
      },
      {
        d: "2001-08-01",
        V41690973: {
          v: "98.4",
        },
        V41690914: {
          v: "98.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.4",
        },
        CPI_TRIM: {
          v: "2.4",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "2.3",
        },
      },
      {
        d: "2001-09-01",
        V41690973: {
          v: "98.6",
        },
        V41690914: {
          v: "98.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "2.3",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.3",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "2.3",
        },
      },
      {
        d: "2001-10-01",
        V41690973: {
          v: "98.1",
        },
        V41690914: {
          v: "98.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "2.6",
        },
        CPIW: {
          v: "2.1",
        },
      },
      {
        d: "2001-11-01",
        V41690973: {
          v: "97.2",
        },
        V41690914: {
          v: "97.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.6",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "1.7",
        },
      },
      {
        d: "2001-12-01",
        V41690973: {
          v: "97.4",
        },
        V41690914: {
          v: "97.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "2.4",
        },
        CPIW: {
          v: "1.6",
        },
      },
      {
        d: "2002-01-01",
        V41690973: {
          v: "97.6",
        },
        V41690914: {
          v: "98.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "1.9",
        },
      },
      {
        d: "2002-02-01",
        V41690973: {
          v: "98.2",
        },
        V41690914: {
          v: "98.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "2.4",
        },
        CPIW: {
          v: "2.1",
        },
      },
      {
        d: "2002-03-01",
        V41690973: {
          v: "98.9",
        },
        V41690914: {
          v: "98.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "2.1",
        },
      },
      {
        d: "2002-04-01",
        V41690973: {
          v: "99.5",
        },
        V41690914: {
          v: "99.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "2.4",
        },
        CPIW: {
          v: "2.1",
        },
      },
      {
        d: "2002-05-01",
        V41690973: {
          v: "99.7",
        },
        V41690914: {
          v: "99.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "1.9",
        },
      },
      {
        d: "2002-06-01",
        V41690973: {
          v: "99.9",
        },
        V41690914: {
          v: "99.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "1.9",
        },
      },
      {
        d: "2002-07-01",
        V41690973: {
          v: "100.5",
        },
        V41690914: {
          v: "100.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "2.0",
        },
      },
      {
        d: "2002-08-01",
        V41690973: {
          v: "100.9",
        },
        V41690914: {
          v: "100.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.5",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.4",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "2.3",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "2.3",
        },
      },
      {
        d: "2002-09-01",
        V41690973: {
          v: "100.9",
        },
        V41690914: {
          v: "100.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.5",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "2.2",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "2.3",
        },
      },
      {
        d: "2002-10-01",
        V41690973: {
          v: "101.2",
        },
        V41690914: {
          v: "101.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.2",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.5",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "2.5",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.4",
        },
      },
      {
        d: "2002-11-01",
        V41690973: {
          v: "101.5",
        },
        V41690914: {
          v: "101.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.4",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "3.2",
        },
        CPI_TRIM: {
          v: "2.3",
        },
        STATIC_CPIXFET: {
          v: "3.1",
        },
        CPI_COMMON: {
          v: "2.4",
        },
        CPIW: {
          v: "2.9",
        },
      },
      {
        d: "2002-12-01",
        V41690973: {
          v: "101.1",
        },
        V41690914: {
          v: "101.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.8",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.8",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "3.3",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "2.4",
        },
      },
      {
        d: "2003-01-01",
        V41690973: {
          v: "102.0",
        },
        V41690914: {
          v: "102.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.5",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "3.3",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "3.4",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "2.8",
        },
      },
      {
        d: "2003-02-01",
        V41690973: {
          v: "102.8",
        },
        V41690914: {
          v: "102.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.7",
        },
        CPI_MEDIAN: {
          v: "2.4",
        },
        ATOM_V41693242: {
          v: "3.0",
        },
        CPI_TRIM: {
          v: "2.3",
        },
        STATIC_CPIXFET: {
          v: "3.3",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "2.9",
        },
      },
      {
        d: "2003-03-01",
        V41690973: {
          v: "103.1",
        },
        V41690914: {
          v: "103.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.2",
        },
        CPI_MEDIAN: {
          v: "2.4",
        },
        ATOM_V41693242: {
          v: "2.8",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "3.1",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "2.7",
        },
      },
      {
        d: "2003-04-01",
        V41690973: {
          v: "102.4",
        },
        V41690914: {
          v: "102.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.9",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.7",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.1",
        },
      },
      {
        d: "2003-05-01",
        V41690973: {
          v: "102.5",
        },
        V41690914: {
          v: "102.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.4",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.5",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.2",
        },
      },
      {
        d: "2003-06-01",
        V41690973: {
          v: "102.5",
        },
        V41690914: {
          v: "102.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.0",
        },
      },
      {
        d: "2003-07-01",
        V41690973: {
          v: "102.6",
        },
        V41690914: {
          v: "102.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.9",
        },
      },
      {
        d: "2003-08-01",
        V41690973: {
          v: "102.9",
        },
        V41690914: {
          v: "102.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.7",
        },
      },
      {
        d: "2003-09-01",
        V41690973: {
          v: "103.1",
        },
        V41690914: {
          v: "103.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.9",
        },
      },
      {
        d: "2003-10-01",
        V41690973: {
          v: "102.8",
        },
        V41690914: {
          v: "102.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.7",
        },
      },
      {
        d: "2003-11-01",
        V41690973: {
          v: "103.1",
        },
        V41690914: {
          v: "103.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.7",
        },
      },
      {
        d: "2003-12-01",
        V41690973: {
          v: "103.2",
        },
        V41690914: {
          v: "103.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.1",
        },
      },
      {
        d: "2004-01-01",
        V41690973: {
          v: "103.3",
        },
        V41690914: {
          v: "103.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.5",
        },
      },
      {
        d: "2004-02-01",
        V41690973: {
          v: "103.5",
        },
        V41690914: {
          v: "103.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.2",
        },
      },
      {
        d: "2004-03-01",
        V41690973: {
          v: "103.9",
        },
        V41690914: {
          v: "103.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.8",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.2",
        },
      },
      {
        d: "2004-04-01",
        V41690973: {
          v: "104.1",
        },
        V41690914: {
          v: "104.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.7",
        },
      },
      {
        d: "2004-05-01",
        V41690973: {
          v: "105.0",
        },
        V41690914: {
          v: "104.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.8",
        },
      },
      {
        d: "2004-06-01",
        V41690973: {
          v: "105.1",
        },
        V41690914: {
          v: "104.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.5",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.8",
        },
      },
      {
        d: "2004-07-01",
        V41690973: {
          v: "105.0",
        },
        V41690914: {
          v: "104.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.8",
        },
      },
      {
        d: "2004-08-01",
        V41690973: {
          v: "104.8",
        },
        V41690914: {
          v: "104.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.8",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.6",
        },
      },
      {
        d: "2004-09-01",
        V41690973: {
          v: "105.0",
        },
        V41690914: {
          v: "104.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.8",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.6",
        },
      },
      {
        d: "2004-10-01",
        V41690973: {
          v: "105.2",
        },
        V41690914: {
          v: "105.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.7",
        },
      },
      {
        d: "2004-11-01",
        V41690973: {
          v: "105.6",
        },
        V41690914: {
          v: "105.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.8",
        },
      },
      {
        d: "2004-12-01",
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "105.4",
        },
        V41690914: {
          v: "105.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.9",
        },
      },
      {
        d: "2005-01-01",
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "105.3",
        },
        V41690914: {
          v: "105.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "2.0",
        },
      },
      {
        d: "2005-02-01",
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "105.7",
        },
        V41690914: {
          v: "105.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.9",
        },
      },
      {
        d: "2005-03-01",
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "106.3",
        },
        V41690914: {
          v: "106.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.9",
        },
      },
      {
        d: "2005-04-01",
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "106.6",
        },
        V41690914: {
          v: "106.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "2.0",
        },
      },
      {
        d: "2005-05-01",
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "106.7",
        },
        V41690914: {
          v: "106.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.9",
        },
      },
      {
        d: "2005-06-01",
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "106.9",
        },
        V41690914: {
          v: "106.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "2.0",
        },
      },
      {
        d: "2005-07-01",
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "107.1",
        },
        V41690914: {
          v: "106.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "2.0",
        },
      },
      {
        d: "2005-08-01",
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "107.5",
        },
        V41690914: {
          v: "107.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "2.1",
        },
      },
      {
        d: "2005-09-01",
        CPIW: {
          v: "2.2",
        },
        V41690973: {
          v: "108.4",
        },
        V41690914: {
          v: "108.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.2",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "2.1",
        },
      },
      {
        d: "2005-10-01",
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "107.9",
        },
        V41690914: {
          v: "108.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.9",
        },
      },
      {
        d: "2005-11-01",
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "107.7",
        },
        V41690914: {
          v: "107.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "2.0",
        },
      },
      {
        d: "2005-12-01",
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "107.6",
        },
        V41690914: {
          v: "108.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.9",
        },
      },
      {
        d: "2006-01-01",
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "108.2",
        },
        V41690914: {
          v: "108.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "2.1",
        },
      },
      {
        d: "2006-02-01",
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "108.0",
        },
        V41690914: {
          v: "108.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "2.0",
        },
      },
      {
        d: "2006-03-01",
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "108.6",
        },
        V41690914: {
          v: "108.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "2.0",
        },
      },
      {
        d: "2006-04-01",
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "109.2",
        },
        V41690914: {
          v: "109.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
      },
      {
        d: "2006-05-01",
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "109.7",
        },
        V41690914: {
          v: "109.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
      },
      {
        d: "2006-06-01",
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "109.5",
        },
        V41690914: {
          v: "109.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
      },
      {
        d: "2006-07-01",
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "109.6",
        },
        V41690914: {
          v: "109.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
      },
      {
        d: "2006-08-01",
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "109.8",
        },
        V41690914: {
          v: "109.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
      },
      {
        d: "2006-09-01",
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "109.2",
        },
        V41690914: {
          v: "109.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.3",
        },
        STATIC_CPIXFET: {
          v: "2.2",
        },
      },
      {
        d: "2006-10-01",
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "109.0",
        },
        V41690914: {
          v: "109.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.4",
        },
        CPI_TRIM: {
          v: "2.4",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
      },
      {
        d: "2006-11-01",
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "109.2",
        },
        V41690914: {
          v: "109.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.5",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
      },
      {
        d: "2006-12-01",
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "109.4",
        },
        V41690914: {
          v: "109.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.5",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
      },
      {
        d: "2007-01-01",
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "109.4",
        },
        V41690914: {
          v: "110.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.5",
        },
        STATIC_CPIXFET: {
          v: "2.3",
        },
      },
      {
        d: "2007-02-01",
        CPI_COMMON: {
          v: "2.4",
        },
        CPIW: {
          v: "2.3",
        },
        V41690973: {
          v: "110.2",
        },
        V41690914: {
          v: "110.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.8",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
      },
      {
        d: "2007-03-01",
        CPI_COMMON: {
          v: "2.4",
        },
        CPIW: {
          v: "2.3",
        },
        V41690973: {
          v: "111.1",
        },
        V41690914: {
          v: "111.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.4",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.8",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
      },
      {
        d: "2007-04-01",
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "2.5",
        },
        V41690973: {
          v: "111.6",
        },
        V41690914: {
          v: "111.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "2.5",
        },
        CPI_TRIM: {
          v: "2.8",
        },
        STATIC_CPIXFET: {
          v: "2.5",
        },
      },
      {
        d: "2007-05-01",
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "2.3",
        },
        V41690973: {
          v: "112.1",
        },
        V41690914: {
          v: "111.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.8",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
      },
      {
        d: "2007-06-01",
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "2.4",
        },
        V41690973: {
          v: "111.9",
        },
        V41690914: {
          v: "111.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.7",
        },
        ATOM_V41693242: {
          v: "2.5",
        },
        CPI_TRIM: {
          v: "2.9",
        },
        STATIC_CPIXFET: {
          v: "2.7",
        },
      },
      {
        d: "2007-07-01",
        CPI_COMMON: {
          v: "2.4",
        },
        CPIW: {
          v: "2.3",
        },
        V41690973: {
          v: "112.0",
        },
        V41690914: {
          v: "111.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.7",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
      },
      {
        d: "2007-08-01",
        CPI_COMMON: {
          v: "2.3",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "111.7",
        },
        V41690914: {
          v: "111.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.5",
        },
        STATIC_CPIXFET: {
          v: "2.2",
        },
      },
      {
        d: "2007-09-01",
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "2.2",
        },
        V41690973: {
          v: "111.9",
        },
        V41690914: {
          v: "111.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.5",
        },
        CPI_MEDIAN: {
          v: "2.7",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "2.5",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
      },
      {
        d: "2007-10-01",
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "111.6",
        },
        V41690914: {
          v: "111.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "2.4",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
      },
      {
        d: "2007-11-01",
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "111.9",
        },
        V41690914: {
          v: "112.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.5",
        },
        CPI_MEDIAN: {
          v: "2.3",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "2.2",
        },
      },
      {
        d: "2007-12-01",
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "112.0",
        },
        V41690914: {
          v: "112.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "2.4",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.2",
        },
      },
      {
        d: "2008-01-01",
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "111.8",
        },
        V41690914: {
          v: "112.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.6",
        },
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "2.3",
        },
      },
      {
        d: "2008-02-01",
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "112.2",
        },
        V41690914: {
          v: "112.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.8",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.2",
        },
      },
      {
        d: "2008-03-01",
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "112.6",
        },
        V41690914: {
          v: "112.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "2.4",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "2.0",
        },
      },
      {
        d: "2008-04-01",
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "113.5",
        },
        V41690914: {
          v: "113.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "2.6",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.3",
        },
      },
      {
        d: "2008-05-01",
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.2",
        },
        V41690973: {
          v: "114.6",
        },
        V41690914: {
          v: "114.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.4",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.3",
        },
      },
      {
        d: "2008-06-01",
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "2.6",
        },
        V41690973: {
          v: "115.4",
        },
        V41690914: {
          v: "114.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.1",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.3",
        },
      },
      {
        d: "2008-07-01",
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "2.6",
        },
        V41690973: {
          v: "115.8",
        },
        V41690914: {
          v: "115.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.4",
        },
        CPI_MEDIAN: {
          v: "2.6",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.5",
        },
      },
      {
        d: "2008-08-01",
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.4",
        },
        CPIW: {
          v: "2.8",
        },
        V41690973: {
          v: "115.6",
        },
        V41690914: {
          v: "115.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.5",
        },
        CPI_MEDIAN: {
          v: "2.7",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "2.5",
        },
      },
      {
        d: "2008-09-01",
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "2.7",
        },
        CPIW: {
          v: "2.9",
        },
        V41690973: {
          v: "115.7",
        },
        V41690914: {
          v: "115.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.4",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "2.5",
        },
      },
      {
        d: "2008-10-01",
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "2.7",
        },
        CPIW: {
          v: "2.6",
        },
        V41690973: {
          v: "114.5",
        },
        V41690914: {
          v: "114.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "2.6",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "2.5",
        },
      },
      {
        d: "2008-11-01",
        STATIC_CPIXFET: {
          v: "2.2",
        },
        CPI_COMMON: {
          v: "3.2",
        },
        CPIW: {
          v: "2.8",
        },
        V41690973: {
          v: "114.1",
        },
        V41690914: {
          v: "114.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "2.7",
        },
        ATOM_V41693242: {
          v: "2.4",
        },
        CPI_TRIM: {
          v: "2.7",
        },
      },
      {
        d: "2008-12-01",
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "3.2",
        },
        CPIW: {
          v: "2.6",
        },
        V41690973: {
          v: "113.3",
        },
        V41690914: {
          v: "113.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "2.7",
        },
        ATOM_V41693242: {
          v: "2.4",
        },
        CPI_TRIM: {
          v: "2.7",
        },
      },
      {
        d: "2009-01-01",
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "3.1",
        },
        CPIW: {
          v: "2.3",
        },
        V41690973: {
          v: "113.0",
        },
        V41690914: {
          v: "113.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "2.5",
        },
      },
      {
        d: "2009-02-01",
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "3.1",
        },
        CPIW: {
          v: "2.4",
        },
        V41690973: {
          v: "113.8",
        },
        V41690914: {
          v: "114.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "2.4",
        },
      },
      {
        d: "2009-03-01",
        CPI_TRIM: {
          v: "2.4",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "3.3",
        },
        CPIW: {
          v: "2.4",
        },
        V41690973: {
          v: "114.0",
        },
        V41690914: {
          v: "114.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
      },
      {
        d: "2009-04-01",
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "3.2",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "113.9",
        },
        V41690914: {
          v: "113.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.4",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
      },
      {
        d: "2009-05-01",
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "3.3",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "114.7",
        },
        V41690914: {
          v: "114.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.1",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
      },
      {
        d: "2009-06-01",
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "3.2",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "115.1",
        },
        V41690914: {
          v: "114.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "-0.3",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
      },
      {
        d: "2009-07-01",
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "3.0",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "114.7",
        },
        V41690914: {
          v: "114.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "-0.9",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
      },
      {
        d: "2009-08-01",
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "2.7",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "114.7",
        },
        V41690914: {
          v: "114.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "-0.8",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
      },
      {
        d: "2009-09-01",
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.8",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "114.7",
        },
        V41690914: {
          v: "114.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "-0.9",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
      },
      {
        d: "2009-10-01",
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "114.6",
        },
        V41690914: {
          v: "114.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.1",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
      },
      {
        d: "2009-11-01",
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.8",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "115.2",
        },
        V41690914: {
          v: "115.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
      },
      {
        d: "2009-12-01",
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.6",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "114.8",
        },
        V41690914: {
          v: "115.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
      },
      {
        d: "2010-01-01",
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "115.1",
        },
        V41690914: {
          v: "115.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
      },
      {
        d: "2010-02-01",
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "115.6",
        },
        V41690914: {
          v: "115.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
      },
      {
        d: "2010-03-01",
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "115.6",
        },
        V41690914: {
          v: "115.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
      },
      {
        d: "2010-04-01",
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "116.0",
        },
        V41690914: {
          v: "115.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.8",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
      },
      {
        d: "2010-05-01",
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "1.1",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "116.3",
        },
        V41690914: {
          v: "115.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
      },
      {
        d: "2010-06-01",
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.1",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "116.2",
        },
        V41690914: {
          v: "116.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
      },
      {
        d: "2010-07-01",
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.7",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "116.8",
        },
        V41690914: {
          v: "116.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.8",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
      },
      {
        d: "2010-08-01",
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "0.7",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "116.7",
        },
        V41690914: {
          v: "116.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
      },
      {
        d: "2010-09-01",
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.0",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "116.9",
        },
        V41690914: {
          v: "116.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
      },
      {
        d: "2010-10-01",
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "117.4",
        },
        V41690914: {
          v: "117.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
      },
      {
        d: "2010-11-01",
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.0",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "117.5",
        },
        V41690914: {
          v: "117.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "1.4",
        },
      },
      {
        d: "2010-12-01",
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "117.5",
        },
        V41690914: {
          v: "118.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
      },
      {
        d: "2011-01-01",
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "117.8",
        },
        V41690914: {
          v: "118.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
      },
      {
        d: "2011-02-01",
        ATOM_V41693242: {
          v: "0.9",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "0.4",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "118.1",
        },
        V41690914: {
          v: "118.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.4",
        },
      },
      {
        d: "2011-03-01",
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "119.4",
        },
        V41690914: {
          v: "119.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.3",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
      },
      {
        d: "2011-04-01",
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "119.8",
        },
        V41690914: {
          v: "119.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.3",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
      },
      {
        d: "2011-05-01",
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "120.6",
        },
        V41690914: {
          v: "120.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.7",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
      },
      {
        d: "2011-06-01",
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "0.7",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "119.8",
        },
        V41690914: {
          v: "119.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.1",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
      },
      {
        d: "2011-07-01",
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "120.0",
        },
        V41690914: {
          v: "119.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.7",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
      },
      {
        d: "2011-08-01",
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "120.3",
        },
        V41690914: {
          v: "120.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.1",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
      },
      {
        d: "2011-09-01",
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "2.3",
        },
        V41690973: {
          v: "120.6",
        },
        V41690914: {
          v: "120.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.2",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
      },
      {
        d: "2011-10-01",
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.2",
        },
        V41690973: {
          v: "120.8",
        },
        V41690914: {
          v: "120.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.9",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
      },
      {
        d: "2011-11-01",
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "120.9",
        },
        V41690914: {
          v: "121.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.9",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
      },
      {
        d: "2011-12-01",
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "120.2",
        },
        V41690914: {
          v: "120.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
      },
      {
        d: "2012-01-01",
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "120.7",
        },
        V41690914: {
          v: "121.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.5",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
      },
      {
        d: "2012-02-01",
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        CPIW: {
          v: "2.2",
        },
        V41690973: {
          v: "121.2",
        },
        V41690914: {
          v: "121.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
      },
      {
        d: "2012-03-01",
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "121.7",
        },
        V41690914: {
          v: "121.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
      },
      {
        d: "2012-04-01",
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "122.2",
        },
        V41690914: {
          v: "121.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
      },
      {
        d: "2012-05-01",
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "122.1",
        },
        V41690914: {
          v: "121.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
      },
      {
        d: "2012-06-01",
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "121.6",
        },
        V41690914: {
          v: "121.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
      },
      {
        d: "2012-07-01",
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "121.5",
        },
        V41690914: {
          v: "121.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
      },
      {
        d: "2012-08-01",
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "121.8",
        },
        V41690914: {
          v: "121.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
      },
      {
        d: "2012-09-01",
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.7",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "122.0",
        },
        V41690914: {
          v: "121.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
      },
      {
        d: "2012-10-01",
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "122.2",
        },
        V41690914: {
          v: "122.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
      },
      {
        d: "2012-11-01",
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "0.8",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "121.9",
        },
        V41690914: {
          v: "122.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.8",
        },
      },
      {
        d: "2012-12-01",
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "0.7",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "121.2",
        },
        V41690914: {
          v: "122.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.8",
        },
      },
      {
        d: "2013-01-01",
        CPI_MEDIAN: {
          v: "1.4",
        },
        ATOM_V41693242: {
          v: "1.0",
        },
        CPI_TRIM: {
          v: "1.0",
        },
        STATIC_CPIXFET: {
          v: "0.5",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "0.9",
        },
        V41690973: {
          v: "121.3",
        },
        V41690914: {
          v: "122.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.5",
        },
      },
      {
        d: "2013-02-01",
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "122.7",
        },
        V41690914: {
          v: "122.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
      },
      {
        d: "2013-03-01",
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "122.9",
        },
        V41690914: {
          v: "122.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
      },
      {
        d: "2013-04-01",
        CPI_MEDIAN: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "0.9",
        },
        STATIC_CPIXFET: {
          v: "0.6",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.0",
        },
        V41690973: {
          v: "122.7",
        },
        V41690914: {
          v: "122.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.4",
        },
      },
      {
        d: "2013-05-01",
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "0.6",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.0",
        },
        V41690973: {
          v: "123.0",
        },
        V41690914: {
          v: "122.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
      },
      {
        d: "2013-06-01",
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "123.0",
        },
        V41690914: {
          v: "122.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
      },
      {
        d: "2013-07-01",
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "123.1",
        },
        V41690914: {
          v: "122.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
      },
      {
        d: "2013-08-01",
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.1",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "123.1",
        },
        V41690914: {
          v: "122.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
      },
      {
        d: "2013-09-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "123.3",
        },
        V41690914: {
          v: "123.1",
        },
      },
      {
        d: "2013-10-01",
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "123.0",
        },
        V41690914: {
          v: "123.0",
        },
      },
      {
        d: "2013-11-01",
        STATIC_TOTALCPICHANGE: {
          v: "0.9",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "0.7",
        },
        CPI_COMMON: {
          v: "1.0",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "123.0",
        },
        V41690914: {
          v: "123.2",
        },
      },
      {
        d: "2013-12-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "122.7",
        },
        V41690914: {
          v: "123.6",
        },
      },
      {
        d: "2014-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "123.1",
        },
        V41690914: {
          v: "123.9",
        },
      },
      {
        d: "2014-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "124.1",
        },
        V41690914: {
          v: "124.3",
        },
      },
      {
        d: "2014-03-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "124.8",
        },
        V41690914: {
          v: "124.5",
        },
      },
      {
        d: "2014-04-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "125.2",
        },
        V41690914: {
          v: "125.0",
        },
      },
      {
        d: "2014-05-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "125.8",
        },
        V41690914: {
          v: "125.1",
        },
      },
      {
        d: "2014-06-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "125.9",
        },
        V41690914: {
          v: "125.4",
        },
      },
      {
        d: "2014-07-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "125.7",
        },
        V41690914: {
          v: "125.4",
        },
      },
      {
        d: "2014-08-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "125.7",
        },
        V41690914: {
          v: "125.5",
        },
      },
      {
        d: "2014-09-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "125.8",
        },
        V41690914: {
          v: "125.7",
        },
      },
      {
        d: "2014-10-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "125.9",
        },
        V41690914: {
          v: "125.9",
        },
      },
      {
        d: "2014-11-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "125.4",
        },
        V41690914: {
          v: "125.7",
        },
      },
      {
        d: "2014-12-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "124.5",
        },
        V41690914: {
          v: "125.5",
        },
      },
      {
        d: "2015-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "124.3",
        },
        V41690914: {
          v: "125.1",
        },
      },
      {
        d: "2015-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "125.4",
        },
        V41690914: {
          v: "125.5",
        },
      },
      {
        d: "2015-03-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.4",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "126.3",
        },
        V41690914: {
          v: "126.1",
        },
      },
      {
        d: "2015-04-01",
        STATIC_TOTALCPICHANGE: {
          v: "0.8",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "126.2",
        },
        V41690914: {
          v: "125.8",
        },
      },
      {
        d: "2015-05-01",
        STATIC_TOTALCPICHANGE: {
          v: "0.9",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "126.9",
        },
        V41690914: {
          v: "126.3",
        },
      },
      {
        d: "2015-06-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "127.2",
        },
        V41690914: {
          v: "126.8",
        },
      },
      {
        d: "2015-07-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.4",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "127.3",
        },
        V41690914: {
          v: "127.1",
        },
      },
      {
        d: "2015-08-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "127.3",
        },
        V41690914: {
          v: "127.1",
        },
      },
      {
        d: "2015-09-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "127.1",
        },
        V41690914: {
          v: "127.0",
        },
      },
      {
        d: "2015-10-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "127.2",
        },
        V41690914: {
          v: "127.2",
        },
      },
      {
        d: "2015-11-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "127.1",
        },
        V41690914: {
          v: "127.3",
        },
      },
      {
        d: "2015-12-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "126.5",
        },
        V41690914: {
          v: "127.4",
        },
      },
      {
        d: "2016-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "126.8",
        },
        V41690914: {
          v: "127.5",
        },
      },
      {
        d: "2016-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "127.1",
        },
        V41690914: {
          v: "127.3",
        },
      },
      {
        d: "2016-03-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "127.9",
        },
        V41690914: {
          v: "127.7",
        },
      },
      {
        d: "2016-04-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "128.3",
        },
        V41690914: {
          v: "127.9",
        },
      },
      {
        d: "2016-05-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "128.8",
        },
        V41690914: {
          v: "128.3",
        },
      },
      {
        d: "2016-06-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "129.1",
        },
        V41690914: {
          v: "128.6",
        },
      },
      {
        d: "2016-07-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "128.9",
        },
        V41690914: {
          v: "128.5",
        },
      },
      {
        d: "2016-08-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "128.7",
        },
        V41690914: {
          v: "128.6",
        },
      },
      {
        d: "2016-09-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "128.8",
        },
        V41690914: {
          v: "128.8",
        },
      },
      {
        d: "2016-10-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.5",
        },
        V41690973: {
          v: "129.1",
        },
        V41690914: {
          v: "129.1",
        },
      },
      {
        d: "2016-11-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "128.6",
        },
        V41690914: {
          v: "128.9",
        },
      },
      {
        d: "2016-12-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "128.4",
        },
        V41690914: {
          v: "129.3",
        },
      },
      {
        d: "2017-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "129.5",
        },
        V41690914: {
          v: "130.1",
        },
      },
      {
        d: "2017-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "1.6",
        },
        V41690973: {
          v: "129.7",
        },
        V41690914: {
          v: "129.9",
        },
      },
      {
        d: "2017-03-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.1",
        },
        CPIW: {
          v: "1.2",
        },
        V41690973: {
          v: "129.9",
        },
        V41690914: {
          v: "129.7",
        },
      },
      {
        d: "2017-04-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.1",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.1",
        },
        CPIW: {
          v: "1.1",
        },
        V41690973: {
          v: "130.4",
        },
        V41690914: {
          v: "130.1",
        },
      },
      {
        d: "2017-05-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "0.9",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.0",
        },
        CPIW: {
          v: "0.9",
        },
        V41690973: {
          v: "130.5",
        },
        V41690914: {
          v: "129.9",
        },
      },
      {
        d: "2017-06-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "0.9",
        },
        CPI_TRIM: {
          v: "1.2",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPI_COMMON: {
          v: "1.1",
        },
        CPIW: {
          v: "0.8",
        },
        V41690973: {
          v: "130.4",
        },
        V41690914: {
          v: "129.9",
        },
      },
      {
        d: "2017-07-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "0.9",
        },
        CPI_TRIM: {
          v: "1.3",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "0.9",
        },
        V41690973: {
          v: "130.4",
        },
        V41690914: {
          v: "130.1",
        },
      },
      {
        d: "2017-08-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "0.9",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.2",
        },
        CPIW: {
          v: "0.9",
        },
        V41690973: {
          v: "130.5",
        },
        V41690914: {
          v: "130.4",
        },
      },
      {
        d: "2017-09-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "0.8",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.2",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.0",
        },
        V41690973: {
          v: "130.8",
        },
        V41690914: {
          v: "130.7",
        },
      },
      {
        d: "2017-10-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "0.9",
        },
        CPI_TRIM: {
          v: "1.4",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPI_COMMON: {
          v: "1.3",
        },
        CPIW: {
          v: "1.0",
        },
        V41690973: {
          v: "130.9",
        },
        V41690914: {
          v: "130.9",
        },
      },
      {
        d: "2017-11-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "131.3",
        },
        V41690914: {
          v: "131.7",
        },
      },
      {
        d: "2017-12-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        CPIW: {
          v: "1.3",
        },
        V41690973: {
          v: "130.8",
        },
        V41690914: {
          v: "131.8",
        },
      },
      {
        d: "2018-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        CPIW: {
          v: "1.4",
        },
        V41690973: {
          v: "131.7",
        },
        V41690914: {
          v: "132.3",
        },
      },
      {
        d: "2018-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.7",
        },
        V41690973: {
          v: "132.5",
        },
        V41690914: {
          v: "132.6",
        },
      },
      {
        d: "2018-03-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.4",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.8",
        },
        V41690973: {
          v: "132.9",
        },
        V41690914: {
          v: "132.7",
        },
      },
      {
        d: "2018-04-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "133.3",
        },
        V41690914: {
          v: "132.8",
        },
      },
      {
        d: "2018-05-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "133.4",
        },
        V41690914: {
          v: "132.9",
        },
      },
      {
        d: "2018-06-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.5",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.3",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "133.6",
        },
        V41690914: {
          v: "133.1",
        },
      },
      {
        d: "2018-07-01",
        STATIC_TOTALCPICHANGE: {
          v: "3.0",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "2.3",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.2",
        },
        V41690973: {
          v: "134.3",
        },
        V41690914: {
          v: "133.7",
        },
      },
      {
        d: "2018-08-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        STATIC_CPIXFET: {
          v: "2.3",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.2",
        },
        V41690973: {
          v: "134.2",
        },
        V41690914: {
          v: "133.9",
        },
      },
      {
        d: "2018-09-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "133.7",
        },
        V41690914: {
          v: "133.8",
        },
      },
      {
        d: "2018-10-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "1.8",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "134.1",
        },
        V41690914: {
          v: "134.2",
        },
      },
      {
        d: "2018-11-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "133.5",
        },
        V41690914: {
          v: "134.0",
        },
      },
      {
        d: "2018-12-01",
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.3",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "133.4",
        },
        V41690914: {
          v: "134.3",
        },
      },
      {
        d: "2019-01-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        CPIW: {
          v: "1.9",
        },
        V41690973: {
          v: "133.6",
        },
        V41690914: {
          v: "134.3",
        },
      },
      {
        d: "2019-02-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.5",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.0",
        },
        V41690973: {
          v: "134.5",
        },
        V41690914: {
          v: "134.7",
        },
      },
      {
        d: "2019-03-01",
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        CPIW: {
          v: "2.1",
        },
        V41690973: {
          v: "135.4",
        },
        V41690914: {
          v: "135.2",
        },
      },
      {
        d: "2019-04-01",
        V41690973: {
          v: "136.0",
        },
        V41690914: {
          v: "135.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPIW: {
          v: "2.0",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
      },
      {
        d: "2019-05-01",
        V41690973: {
          v: "136.6",
        },
        V41690914: {
          v: "136.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
        CPIW: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
      },
      {
        d: "2019-06-01",
        V41690973: {
          v: "136.3",
        },
        V41690914: {
          v: "135.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.3",
        },
        CPIW: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
      },
      {
        d: "2019-07-01",
        V41690973: {
          v: "137.0",
        },
        V41690914: {
          v: "136.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.2",
        },
        CPIW: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
      },
      {
        d: "2019-08-01",
        V41690973: {
          v: "136.8",
        },
        V41690914: {
          v: "136.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.2",
        },
        CPIW: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
      },
      {
        d: "2019-09-01",
        V41690973: {
          v: "136.2",
        },
        V41690914: {
          v: "136.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.1",
        },
        CPIW: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
      },
      {
        d: "2019-10-01",
        V41690973: {
          v: "136.6",
        },
        V41690914: {
          v: "136.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPIW: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
      },
      {
        d: "2019-11-01",
        V41690973: {
          v: "136.4",
        },
        V41690914: {
          v: "136.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "2.0",
        },
        CPIW: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        CPI_COMMON: {
          v: "2.4",
        },
        ATOM_V41693242: {
          v: "1.9",
        },
      },
      {
        d: "2019-12-01",
        V41690973: {
          v: "136.4",
        },
        V41690914: {
          v: "137.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPIW: {
          v: "2.4",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.1",
        },
        CPI_COMMON: {
          v: "2.3",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
      },
      {
        d: "2020-01-01",
        V41690973: {
          v: "136.8",
        },
        V41690914: {
          v: "137.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.4",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPIW: {
          v: "2.2",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "1.8",
        },
      },
      {
        d: "2020-02-01",
        ATOM_V41693242: {
          v: "1.8",
        },
        V41690973: {
          v: "137.4",
        },
        V41690914: {
          v: "137.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPIW: {
          v: "2.1",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "2.0",
        },
      },
      {
        d: "2020-03-01",
        V41690973: {
          v: "136.6",
        },
        V41690914: {
          v: "136.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.9",
        },
        STATIC_CPIXFET: {
          v: "1.7",
        },
        CPIW: {
          v: "1.7",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
      },
      {
        d: "2020-04-01",
        V41690973: {
          v: "135.7",
        },
        V41690914: {
          v: "135.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "-0.2",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPIW: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
      },
      {
        d: "2020-05-01",
        V41690973: {
          v: "136.1",
        },
        V41690914: {
          v: "135.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "-0.4",
        },
        STATIC_CPIXFET: {
          v: "0.6",
        },
        CPIW: {
          v: "0.7",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.5",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "0.7",
        },
      },
      {
        d: "2020-06-01",
        V41690973: {
          v: "137.2",
        },
        V41690914: {
          v: "136.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        STATIC_CPIXFET: {
          v: "1.0",
        },
        CPIW: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "1.1",
        },
      },
      {
        d: "2020-07-01",
        ATOM_V41693242: {
          v: "0.7",
        },
        V41690973: {
          v: "137.2",
        },
        V41690914: {
          v: "136.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.1",
        },
        STATIC_CPIXFET: {
          v: "0.5",
        },
        CPIW: {
          v: "1.0",
        },
        CPI_MEDIAN: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.4",
        },
      },
      {
        d: "2020-08-01",
        CPI_MEDIAN: {
          v: "1.8",
        },
        CPI_TRIM: {
          v: "1.6",
        },
        CPI_COMMON: {
          v: "1.5",
        },
        ATOM_V41693242: {
          v: "0.8",
        },
        V41690973: {
          v: "137.0",
        },
        V41690914: {
          v: "136.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.1",
        },
        STATIC_CPIXFET: {
          v: "0.5",
        },
        CPIW: {
          v: "1.1",
        },
      },
      {
        d: "2020-09-01",
        V41690973: {
          v: "136.9",
        },
        V41690914: {
          v: "137.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.5",
        },
        STATIC_CPIXFET: {
          v: "0.8",
        },
        CPIW: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "1.9",
        },
        CPI_TRIM: {
          v: "1.7",
        },
        CPI_COMMON: {
          v: "1.4",
        },
        ATOM_V41693242: {
          v: "1.0",
        },
      },
      {
        d: "2020-10-01",
        V41690973: {
          v: "137.5",
        },
        V41690914: {
          v: "137.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        STATIC_CPIXFET: {
          v: "0.8",
        },
        CPIW: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.0",
        },
      },
      {
        d: "2020-11-01",
        V41690973: {
          v: "137.7",
        },
        V41690914: {
          v: "138.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        STATIC_CPIXFET: {
          v: "1.3",
        },
        CPIW: {
          v: "1.4",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.7",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
      },
      {
        d: "2020-12-01",
        V41690973: {
          v: "137.4",
        },
        V41690914: {
          v: "138.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "0.7",
        },
        STATIC_CPIXFET: {
          v: "1.1",
        },
        CPIW: {
          v: "1.2",
        },
        CPI_MEDIAN: {
          v: "2.0",
        },
        CPI_TRIM: {
          v: "1.8",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
      },
      {
        d: "2021-01-01",
        ATOM_V41693242: {
          v: "1.6",
        },
        V41690973: {
          v: "138.2",
        },
        V41690914: {
          v: "139.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.0",
        },
        STATIC_CPIXFET: {
          v: "1.4",
        },
        CPIW: {
          v: "1.3",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "1.9",
        },
        CPI_COMMON: {
          v: "1.6",
        },
      },
      {
        d: "2021-02-01",
        V41690973: {
          v: "138.9",
        },
        V41690914: {
          v: "139.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.1",
        },
        STATIC_CPIXFET: {
          v: "0.8",
        },
        CPIW: {
          v: "1.1",
        },
        CPI_MEDIAN: {
          v: "2.1",
        },
        CPI_TRIM: {
          v: "2.0",
        },
        CPI_COMMON: {
          v: "1.6",
        },
        ATOM_V41693242: {
          v: "1.2",
        },
      },
      {
        d: "2021-03-01",
        V41690973: {
          v: "139.6",
        },
        V41690914: {
          v: "139.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.2",
        },
        STATIC_CPIXFET: {
          v: "0.9",
        },
        CPIW: {
          v: "1.6",
        },
        CPI_MEDIAN: {
          v: "2.2",
        },
        CPI_TRIM: {
          v: "2.2",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.4",
        },
      },
      {
        d: "2021-04-01",
        V41690973: {
          v: "140.3",
        },
        V41690914: {
          v: "139.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.4",
        },
        STATIC_CPIXFET: {
          v: "1.8",
        },
        CPIW: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "2.3",
        },
        CPI_TRIM: {
          v: "2.4",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "2.3",
        },
      },
      {
        d: "2021-05-01",
        V41690973: {
          v: "141.0",
        },
        V41690914: {
          v: "140.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.6",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
        CPIW: {
          v: "3.0",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        CPI_TRIM: {
          v: "2.8",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "2.8",
        },
      },
      {
        d: "2021-06-01",
        V41690973: {
          v: "141.4",
        },
        V41690914: {
          v: "140.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.1",
        },
        STATIC_CPIXFET: {
          v: "2.2",
        },
        CPIW: {
          v: "3.0",
        },
        CPI_MEDIAN: {
          v: "2.5",
        },
        CPI_TRIM: {
          v: "2.8",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "2.7",
        },
      },
      {
        d: "2021-07-01",
        ATOM_V41693242: {
          v: "3.3",
        },
        V41690973: {
          v: "142.3",
        },
        V41690914: {
          v: "141.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.7",
        },
        STATIC_CPIXFET: {
          v: "2.8",
        },
        CPIW: {
          v: "3.3",
        },
        CPI_MEDIAN: {
          v: "2.8",
        },
        CPI_TRIM: {
          v: "3.2",
        },
        CPI_COMMON: {
          v: "2.7",
        },
      },
      {
        d: "2021-08-01",
        ATOM_V41693242: {
          v: "3.5",
        },
        V41690973: {
          v: "142.6",
        },
        V41690914: {
          v: "142.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.1",
        },
        STATIC_CPIXFET: {
          v: "3.0",
        },
        CPIW: {
          v: "3.4",
        },
        CPI_MEDIAN: {
          v: "2.9",
        },
        CPI_TRIM: {
          v: "3.4",
        },
        CPI_COMMON: {
          v: "2.9",
        },
      },
      {
        d: "2021-09-01",
        ATOM_V41693242: {
          v: "3.7",
        },
        V41690973: {
          v: "142.9",
        },
        V41690914: {
          v: "143.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.4",
        },
        STATIC_CPIXFET: {
          v: "3.3",
        },
        CPIW: {
          v: "3.5",
        },
        CPI_MEDIAN: {
          v: "3.0",
        },
        CPI_TRIM: {
          v: "3.5",
        },
        CPI_COMMON: {
          v: "3.1",
        },
      },
      {
        d: "2021-10-01",
        ATOM_V41693242: {
          v: "3.8",
        },
        V41690973: {
          v: "143.9",
        },
        V41690914: {
          v: "143.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.7",
        },
        STATIC_CPIXFET: {
          v: "3.2",
        },
        CPIW: {
          v: "3.6",
        },
        CPI_MEDIAN: {
          v: "3.0",
        },
        CPI_TRIM: {
          v: "3.5",
        },
        CPI_COMMON: {
          v: "3.0",
        },
      },
      {
        d: "2021-11-01",
        ATOM_V41693242: {
          v: "3.6",
        },
        V41690973: {
          v: "144.2",
        },
        V41690914: {
          v: "144.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.7",
        },
        STATIC_CPIXFET: {
          v: "3.1",
        },
        CPIW: {
          v: "3.6",
        },
        CPI_MEDIAN: {
          v: "3.1",
        },
        CPI_TRIM: {
          v: "3.5",
        },
        CPI_COMMON: {
          v: "3.1",
        },
      },
      {
        d: "2021-12-01",
        V41690973: {
          v: "144.0",
        },
        V41690914: {
          v: "145.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.8",
        },
        STATIC_CPIXFET: {
          v: "3.4",
        },
        CPIW: {
          v: "3.9",
        },
        CPI_MEDIAN: {
          v: "3.3",
        },
        CPI_TRIM: {
          v: "4.0",
        },
        CPI_COMMON: {
          v: "3.2",
        },
        ATOM_V41693242: {
          v: "4.0",
        },
      },
      {
        d: "2022-01-01",
        V41690973: {
          v: "145.3",
        },
        V41690914: {
          v: "146.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "5.1",
        },
        STATIC_CPIXFET: {
          v: "3.5",
        },
        CPIW: {
          v: "4.2",
        },
        CPI_MEDIAN: {
          v: "3.7",
        },
        CPI_TRIM: {
          v: "4.2",
        },
        CPI_COMMON: {
          v: "3.7",
        },
        ATOM_V41693242: {
          v: "4.3",
        },
      },
      {
        d: "2022-02-01",
        V41690973: {
          v: "146.8",
        },
        V41690914: {
          v: "147.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "5.7",
        },
        STATIC_CPIXFET: {
          v: "3.9",
        },
        CPIW: {
          v: "4.7",
        },
        CPI_MEDIAN: {
          v: "3.9",
        },
        CPI_TRIM: {
          v: "4.5",
        },
        CPI_COMMON: {
          v: "4.1",
        },
        ATOM_V41693242: {
          v: "4.8",
        },
      },
      {
        d: "2022-03-01",
        ATOM_V41693242: {
          v: "5.5",
        },
        V41690973: {
          v: "148.9",
        },
        V41690914: {
          v: "148.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "6.7",
        },
        STATIC_CPIXFET: {
          v: "4.7",
        },
        CPIW: {
          v: "5.3",
        },
        CPI_MEDIAN: {
          v: "4.4",
        },
        CPI_TRIM: {
          v: "5.0",
        },
        CPI_COMMON: {
          v: "4.5",
        },
      },
      {
        d: "2022-04-01",
        ATOM_V41693242: {
          v: "5.7",
        },
        V41690973: {
          v: "149.8",
        },
        V41690914: {
          v: "149.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "6.8",
        },
        STATIC_CPIXFET: {
          v: "4.6",
        },
        CPIW: {
          v: "5.6",
        },
        CPI_MEDIAN: {
          v: "4.7",
        },
        CPI_TRIM: {
          v: "5.3",
        },
        CPI_COMMON: {
          v: "4.9",
        },
      },
      {
        d: "2022-05-01",
        ATOM_V41693242: {
          v: "6.1",
        },
        V41690973: {
          v: "151.9",
        },
        V41690914: {
          v: "151.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "7.7",
        },
        STATIC_CPIXFET: {
          v: "5.2",
        },
        CPIW: {
          v: "6.3",
        },
        CPI_MEDIAN: {
          v: "5.0",
        },
        CPI_TRIM: {
          v: "5.6",
        },
        CPI_COMMON: {
          v: "5.4",
        },
      },
      {
        d: "2022-06-01",
        ATOM_V41693242: {
          v: "6.2",
        },
        V41690973: {
          v: "152.9",
        },
        V41690914: {
          v: "152.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "8.1",
        },
        STATIC_CPIXFET: {
          v: "5.3",
        },
        CPIW: {
          v: "6.4",
        },
        CPI_MEDIAN: {
          v: "5.2",
        },
        CPI_TRIM: {
          v: "5.7",
        },
        CPI_COMMON: {
          v: "5.6",
        },
      },
      {
        d: "2022-07-01",
        V41690973: {
          v: "153.1",
        },
        V41690914: {
          v: "152.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "7.6",
        },
        STATIC_CPIXFET: {
          v: "5.5",
        },
        CPIW: {
          v: "6.2",
        },
        CPI_MEDIAN: {
          v: "5.1",
        },
        CPI_TRIM: {
          v: "5.6",
        },
        CPI_COMMON: {
          v: "5.8",
        },
        ATOM_V41693242: {
          v: "6.1",
        },
      },
      {
        d: "2022-08-01",
        V41690973: {
          v: "152.6",
        },
        V41690914: {
          v: "152.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "7.0",
        },
        STATIC_CPIXFET: {
          v: "5.3",
        },
        CPIW: {
          v: "6.0",
        },
        CPI_MEDIAN: {
          v: "5.0",
        },
        CPI_TRIM: {
          v: "5.4",
        },
        CPI_COMMON: {
          v: "5.8",
        },
        ATOM_V41693242: {
          v: "5.8",
        },
      },
      {
        d: "2022-09-01",
        ATOM_V41693242: {
          v: "6.0",
        },
        V41690973: {
          v: "152.7",
        },
        V41690914: {
          v: "152.8",
        },
        STATIC_TOTALCPICHANGE: {
          v: "6.9",
        },
        STATIC_CPIXFET: {
          v: "5.4",
        },
        CPIW: {
          v: "6.0",
        },
        CPI_MEDIAN: {
          v: "5.1",
        },
        CPI_TRIM: {
          v: "5.5",
        },
        CPI_COMMON: {
          v: "5.9",
        },
      },
      {
        d: "2022-10-01",
        ATOM_V41693242: {
          v: "5.8",
        },
        V41690973: {
          v: "153.8",
        },
        V41690914: {
          v: "153.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "6.9",
        },
        STATIC_CPIXFET: {
          v: "5.3",
        },
        CPIW: {
          v: "6.1",
        },
        CPI_MEDIAN: {
          v: "5.2",
        },
        CPI_TRIM: {
          v: "5.5",
        },
        CPI_COMMON: {
          v: "5.9",
        },
      },
      {
        d: "2022-11-01",
        ATOM_V41693242: {
          v: "5.8",
        },
        V41690973: {
          v: "154.0",
        },
        V41690914: {
          v: "154.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "6.8",
        },
        STATIC_CPIXFET: {
          v: "5.4",
        },
        CPIW: {
          v: "6.1",
        },
        CPI_MEDIAN: {
          v: "5.2",
        },
        CPI_TRIM: {
          v: "5.5",
        },
        CPI_COMMON: {
          v: "6.2",
        },
      },
      {
        d: "2022-12-01",
        V41690973: {
          v: "153.1",
        },
        V41690914: {
          v: "154.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "6.3",
        },
        STATIC_CPIXFET: {
          v: "5.3",
        },
        CPIW: {
          v: "5.9",
        },
        CPI_MEDIAN: {
          v: "5.1",
        },
        CPI_TRIM: {
          v: "5.2",
        },
        CPI_COMMON: {
          v: "6.1",
        },
        ATOM_V41693242: {
          v: "5.4",
        },
      },
      {
        d: "2023-01-01",
        V41690973: {
          v: "153.9",
        },
        V41690914: {
          v: "154.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "5.9",
        },
        STATIC_CPIXFET: {
          v: "4.9",
        },
        CPIW: {
          v: "5.6",
        },
        CPI_MEDIAN: {
          v: "4.8",
        },
        CPI_TRIM: {
          v: "5.0",
        },
        CPI_COMMON: {
          v: "6.1",
        },
        ATOM_V41693242: {
          v: "5.0",
        },
      },
      {
        d: "2023-02-01",
        V41690973: {
          v: "154.5",
        },
        V41690914: {
          v: "155.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "5.2",
        },
        STATIC_CPIXFET: {
          v: "4.8",
        },
        CPIW: {
          v: "5.3",
        },
        CPI_MEDIAN: {
          v: "4.8",
        },
        CPI_TRIM: {
          v: "4.7",
        },
        CPI_COMMON: {
          v: "5.9",
        },
        ATOM_V41693242: {
          v: "4.7",
        },
      },
      {
        d: "2023-03-01",
        ATOM_V41693242: {
          v: "4.3",
        },
        V41690973: {
          v: "155.3",
        },
        V41690914: {
          v: "155.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.3",
        },
        STATIC_CPIXFET: {
          v: "4.5",
        },
        CPIW: {
          v: "4.9",
        },
        CPI_MEDIAN: {
          v: "4.4",
        },
        CPI_TRIM: {
          v: "4.2",
        },
        CPI_COMMON: {
          v: "5.7",
        },
      },
      {
        d: "2023-04-01",
        V41690973: {
          v: "156.4",
        },
        V41690914: {
          v: "156.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.4",
        },
        STATIC_CPIXFET: {
          v: "4.4",
        },
        CPIW: {
          v: "4.8",
        },
        CPI_MEDIAN: {
          v: "4.2",
        },
        CPI_TRIM: {
          v: "4.0",
        },
        CPI_COMMON: {
          v: "5.5",
        },
        ATOM_V41693242: {
          v: "4.1",
        },
      },
      {
        d: "2023-05-01",
        V41690973: {
          v: "157.0",
        },
        V41690914: {
          v: "156.1",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.4",
        },
        STATIC_CPIXFET: {
          v: "4.0",
        },
        CPIW: {
          v: "4.7",
        },
        CPI_MEDIAN: {
          v: "3.8",
        },
        CPI_TRIM: {
          v: "3.6",
        },
        CPI_COMMON: {
          v: "5.2",
        },
        ATOM_V41693242: {
          v: "3.7",
        },
      },
      {
        d: "2023-06-01",
        ATOM_V41693242: {
          v: "3.2",
        },
        V41690973: {
          v: "157.2",
        },
        V41690914: {
          v: "156.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.8",
        },
        STATIC_CPIXFET: {
          v: "3.5",
        },
        CPIW: {
          v: "4.4",
        },
        CPI_MEDIAN: {
          v: "3.8",
        },
        CPI_TRIM: {
          v: "3.6",
        },
        CPI_COMMON: {
          v: "5.0",
        },
      },
      {
        d: "2023-07-01",
        ATOM_V41693242: {
          v: "3.2",
        },
        V41690973: {
          v: "158.1",
        },
        V41690914: {
          v: "157.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.3",
        },
        STATIC_CPIXFET: {
          v: "3.4",
        },
        CPIW: {
          v: "4.2",
        },
        CPI_MEDIAN: {
          v: "3.8",
        },
        CPI_TRIM: {
          v: "3.5",
        },
        CPI_COMMON: {
          v: "4.7",
        },
      },
      {
        d: "2023-08-01",
        V41690973: {
          v: "158.7",
        },
        V41690914: {
          v: "158.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "4.0",
        },
        STATIC_CPIXFET: {
          v: "3.6",
        },
        CPIW: {
          v: "4.5",
        },
        CPI_MEDIAN: {
          v: "4.0",
        },
        CPI_TRIM: {
          v: "3.7",
        },
        CPI_COMMON: {
          v: "4.7",
        },
        ATOM_V41693242: {
          v: "3.3",
        },
      },
      {
        d: "2023-09-01",
        V41690973: {
          v: "158.5",
        },
        V41690914: {
          v: "158.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.8",
        },
        STATIC_CPIXFET: {
          v: "3.2",
        },
        CPIW: {
          v: "4.2",
        },
        CPI_MEDIAN: {
          v: "3.8",
        },
        CPI_TRIM: {
          v: "3.5",
        },
        CPI_COMMON: {
          v: "4.3",
        },
        ATOM_V41693242: {
          v: "2.8",
        },
      },
      {
        d: "2023-10-01",
        ATOM_V41693242: {
          v: "2.7",
        },
        V41690973: {
          v: "158.6",
        },
        V41690914: {
          v: "158.5",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.1",
        },
        STATIC_CPIXFET: {
          v: "3.4",
        },
        CPIW: {
          v: "4.0",
        },
        CPI_MEDIAN: {
          v: "3.6",
        },
        CPI_TRIM: {
          v: "3.4",
        },
        CPI_COMMON: {
          v: "4.1",
        },
      },
      {
        d: "2023-11-01",
        V41690973: {
          v: "158.8",
        },
        V41690914: {
          v: "159.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.1",
        },
        STATIC_CPIXFET: {
          v: "3.5",
        },
        CPIW: {
          v: "4.0",
        },
        CPI_MEDIAN: {
          v: "3.6",
        },
        CPI_TRIM: {
          v: "3.4",
        },
        CPI_COMMON: {
          v: "3.8",
        },
        ATOM_V41693242: {
          v: "2.8",
        },
      },
      {
        d: "2023-12-01",
        V41690973: {
          v: "158.3",
        },
        V41690914: {
          v: "159.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "3.4",
        },
        STATIC_CPIXFET: {
          v: "3.4",
        },
        CPIW: {
          v: "4.0",
        },
        CPI_MEDIAN: {
          v: "3.7",
        },
        CPI_TRIM: {
          v: "3.6",
        },
        CPI_COMMON: {
          v: "3.8",
        },
        ATOM_V41693242: {
          v: "2.6",
        },
      },
      {
        d: "2024-01-01",
        STATIC_CPIXFET: {
          v: "3.1",
        },
        CPIW: {
          v: "3.7",
        },
        CPI_MEDIAN: {
          v: "3.6",
        },
        CPI_TRIM: {
          v: "3.3",
        },
        CPI_COMMON: {
          v: "3.2",
        },
        ATOM_V41693242: {
          v: "2.4",
        },
        V41690973: {
          v: "158.3",
        },
        V41690914: {
          v: "159.4",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.9",
        },
      },
      {
        d: "2024-02-01",
        V41690973: {
          v: "158.8",
        },
        V41690914: {
          v: "159.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.8",
        },
        STATIC_CPIXFET: {
          v: "2.8",
        },
        CPIW: {
          v: "3.4",
        },
        CPI_MEDIAN: {
          v: "3.4",
        },
        CPI_TRIM: {
          v: "3.2",
        },
        CPI_COMMON: {
          v: "3.0",
        },
        ATOM_V41693242: {
          v: "2.1",
        },
      },
      {
        d: "2024-03-01",
        V41690973: {
          v: "159.8",
        },
        V41690914: {
          v: "159.9",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.9",
        },
        STATIC_CPIXFET: {
          v: "2.9",
        },
        CPIW: {
          v: "3.3",
        },
        CPI_MEDIAN: {
          v: "3.3",
        },
        CPI_TRIM: {
          v: "3.1",
        },
        CPI_COMMON: {
          v: "2.8",
        },
        ATOM_V41693242: {
          v: "2.0",
        },
      },
      {
        d: "2024-04-01",
        ATOM_V41693242: {
          v: "1.6",
        },
        V41690973: {
          v: "160.6",
        },
        V41690914: {
          v: "160.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.7",
        },
        STATIC_CPIXFET: {
          v: "2.7",
        },
        CPIW: {
          v: "3.0",
        },
        CPI_MEDIAN: {
          v: "3.0",
        },
        CPI_TRIM: {
          v: "2.8",
        },
        CPI_COMMON: {
          v: "2.5",
        },
      },
      {
        d: "2024-05-01",
        ATOM_V41693242: {
          v: "1.8",
        },
        V41690973: {
          v: "161.5",
        },
        V41690914: {
          v: "160.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.9",
        },
        STATIC_CPIXFET: {
          v: "2.9",
        },
        CPIW: {
          v: "3.4",
        },
        CPI_MEDIAN: {
          v: "3.2",
        },
        CPI_TRIM: {
          v: "3.0",
        },
        CPI_COMMON: {
          v: "2.4",
        },
      },
      {
        d: "2024-06-01",
        ATOM_V41693242: {
          v: "1.9",
        },
        V41690973: {
          v: "161.4",
        },
        V41690914: {
          v: "160.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.7",
        },
        STATIC_CPIXFET: {
          v: "2.9",
        },
        CPIW: {
          v: "3.3",
        },
        CPI_MEDIAN: {
          v: "3.1",
        },
        CPI_TRIM: {
          v: "2.9",
        },
        CPI_COMMON: {
          v: "2.2",
        },
      },
      {
        d: "2024-07-01",
        V41690973: {
          v: "162.1",
        },
        V41690914: {
          v: "161.2",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.5",
        },
        STATIC_CPIXFET: {
          v: "2.7",
        },
        CPIW: {
          v: "3.1",
        },
        CPI_MEDIAN: {
          v: "2.9",
        },
        CPI_TRIM: {
          v: "2.7",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
      },
      {
        d: "2024-08-01",
        V41690973: {
          v: "161.8",
        },
        V41690914: {
          v: "161.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
        CPIW: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "2.7",
        },
        CPI_TRIM: {
          v: "2.5",
        },
        CPI_COMMON: {
          v: "1.9",
        },
        ATOM_V41693242: {
          v: "1.5",
        },
      },
      {
        d: "2024-09-01",
        V41690973: {
          v: "161.1",
        },
        V41690914: {
          v: "161.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.6",
        },
        STATIC_CPIXFET: {
          v: "2.4",
        },
        CPIW: {
          v: "2.7",
        },
        CPI_MEDIAN: {
          v: "2.7",
        },
        CPI_TRIM: {
          v: "2.5",
        },
        CPI_COMMON: {
          v: "2.1",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
      },
      {
        d: "2024-10-01",
        V41690973: {
          v: "161.8",
        },
        V41690914: {
          v: "161.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.0",
        },
        STATIC_CPIXFET: {
          v: "2.3",
        },
        CPIW: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "2.9",
        },
        CPI_TRIM: {
          v: "2.7",
        },
        CPI_COMMON: {
          v: "2.2",
        },
        ATOM_V41693242: {
          v: "1.7",
        },
      },
      {
        d: "2024-11-01",
        V41690973: {
          v: "161.8",
        },
        V41690914: {
          v: "162.0",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "1.9",
        },
        CPIW: {
          v: "2.6",
        },
        CPI_MEDIAN: {
          v: "2.8",
        },
        CPI_TRIM: {
          v: "2.7",
        },
        CPI_COMMON: {
          v: "2.0",
        },
        ATOM_V41693242: {
          v: "1.6",
        },
      },
      {
        d: "2024-12-01",
        ATOM_V41693242: {
          v: "1.8",
        },
        V41690973: {
          v: "161.2",
        },
        V41690914: {
          v: "162.3",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.8",
        },
        STATIC_CPIXFET: {
          v: "2.3",
        },
        CPIW: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.7",
        },
        CPI_TRIM: {
          v: "2.5",
        },
        CPI_COMMON: {
          v: "2.0",
        },
      },
      {
        d: "2025-01-01",
        ATOM_V41693242: {
          v: "2.1",
        },
        V41690973: {
          v: "161.3",
        },
        V41690914: {
          v: "162.6",
        },
        STATIC_TOTALCPICHANGE: {
          v: "1.9",
        },
        STATIC_CPIXFET: {
          v: "2.5",
        },
        CPIW: {
          v: "2.3",
        },
        CPI_MEDIAN: {
          v: "2.7",
        },
        CPI_TRIM: {
          v: "2.7",
        },
        CPI_COMMON: {
          v: "2.2",
        },
      },
      {
        d: "2025-02-01",
        V41690973: {
          v: "163.0",
        },
        V41690914: {
          v: "163.7",
        },
        STATIC_TOTALCPICHANGE: {
          v: "2.6",
        },
        STATIC_CPIXFET: {
          v: "3.0",
        },
        CPIW: {
          v: "2.8",
        },
        CPI_MEDIAN: {
          v: "2.9",
        },
        CPI_TRIM: {
          v: "2.9",
        },
        CPI_COMMON: {
          v: "2.5",
        },
        ATOM_V41693242: {
          v: "2.7",
        },
      },
    ],
  },
};
