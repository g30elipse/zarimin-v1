import { Chart, ChartsFilters, ChartsSort } from '@/types';
import { fetchGraphQL } from '.';
import { parseChart } from '../parsers';

const CHART_GRAPHQL_FIELDS = `
    title
    slug
    list
    showInHomePage
    sys {
        id
        publishedAt
    }
    contentfulMetadata {
        tags {
            id
            name
        }
    }
  
`;

function buildChartsFilter(_query: ChartsFilters): string {
    const query = {
        ..._query,
        page: _query.page ?? 1,
        perPage: _query.perPage ?? 5,
        // limit: _query.perPage ?? 24,
    };

    const limit = query.perPage ?? 24;
    const skip = (query.page - 1) * limit;
    let filterString = '';

    if (query.showInHomePage) {
        filterString = `OR: [ 
            { showInHomePage: true }
        ]`;
    }
    return `where: { ${filterString} }, skip: ${skip}, limit: ${limit}, order: ${
        query.sort ?? ChartsSort.CREATED_DESC
    }`;
}

export const chartsApi = {
    searchCharts: async (query: ChartsFilters): Promise<Chart[]> => {
        const entries = await fetchGraphQL(
            `query {
                chartCollection(${buildChartsFilter(query)}) {
                  items {
                    ${CHART_GRAPHQL_FIELDS}
                  }
                }
                }`
        );

        console.log('entries', entries);
        return (entries?.data?.chartCollection?.items || []).map(parseChart);
    },

    getChartById: async (id: string): Promise<Chart | null> => {
        const entry = await fetchGraphQL(
            `query {
                chartCollection(where: { slug: "${id}", }, limit: 1) {
                  items {
                    ${CHART_GRAPHQL_FIELDS}
                  }
                }
              }`
        );
        return parseChart(entry?.data?.chartCollection?.items?.[0]);
    },
};
