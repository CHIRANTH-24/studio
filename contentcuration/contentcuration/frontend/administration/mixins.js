import debounce from 'lodash/debounce';
import difference from 'lodash/difference';
import findKey from 'lodash/findKey';
import intersection from 'lodash/intersection';
import transform from 'lodash/transform';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';

function _getBooleanVal(value) {
  return typeof value === 'string' ? value === 'true' : value;
}

export function generateFilterMixin(filterMap) {
  const paramKeys = Object.values(filterMap).flatMap(f => Object.keys(f.params));
  return {
    data() {
      return {
        filterKey: '',
        keywordInput: '',
      };
    },
    computed: {
      keywords: {
        get() {
          return this.$route.query.keywords;
        },
        set(value) {
          let params = { ...this.$route.query, page: 1 };
          if (value) {
            params.keywords = value;
          } else {
            delete params['keywords'];
          }
          this.updateQueryParams(params);
        },
      },
      filter: {
        get() {
          // Return filter where all param conditions are met
          const filterKeys = intersection(Object.keys(this.$route.query), paramKeys);
          let key = findKey(filterMap, value => {
            return filterKeys.every(field => {
              return value.params[field] === _getBooleanVal(this.$route.query[field]);
            });
          });
          return key;
        },
        set(value) {
          // Get params that aren't part of the filterMap
          const otherFilters = difference(Object.keys(this.$route.query), paramKeys).reduce(
            (result, key) => {
              result[key] = this.$route.query[key];
              return result;
            },
            {}
          );

          // Set the router with the params from the filterMap and current route
          this.updateQueryParams({
            ...otherFilters,
            ...filterMap[value].params,
            page: 1,
          });
        },
      },
      filters() {
        return Object.entries(filterMap).map(([key, value]) => {
          return { key, label: value.label };
        });
      },
      setKeywords() {
        return debounce(this.updateKeywords, 500);
      },
    },
    watch: {
      keywords() {
        this.keywordInput = this.keywords;
      },
    },
    beforeMount() {
      this.keywordInput = this.$route.query.keywords;
    },
    methods: {
      updateQueryParams(params) {
        const query = transform(
          params,
          (result, value, key) => {
            if (value != null) {
              result[key] = value;
            }
          },
          {}
        );
        this.$router.push({ query }).catch(error => {
          if (error && error.name != 'NavigationDuplicated') {
            throw error;
          }
        });
      },
      clearSearch: function() {
        this.keywords = '';
      },
      updateKeywords() {
        this.keywords = this.keywordInput;
      },
    },
  };
}

export const tableMixin = {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    pagination: {
      get() {
        let params = {
          rowsPerPage: Number(this.$route.query.page_size) || 25,
          page: Number(this.$route.query.page) || 1,
        };
        // Add descending if it's in the route query params
        if (this.$route.query.descending !== undefined && this.$route.query.descending !== null) {
          params.descending = this.$route.query.descending.toString() === 'true';
        }
        // Add sortBy if it's in the route query params
        if (this.$route.query.sortBy) {
          params.sortBy = this.$route.query.sortBy;
        }

        return params;
      },
      set(pagination) {
        // Removes null pagination parameters from the URL
        const newQuery = pickBy(
          {
            ...this.$route.query,
            page_size: pagination.rowsPerPage,
            ...omit(pagination, ['rowsPerPage', 'totalItems']),
          },
          value => {
            return value !== null;
          }
        );

        // TODO prevent 'ordering' from being set since it's not used
        delete newQuery.ordering;
        this.$router
          .replace({
            ...this.$route,
            query: newQuery,
          })
          .catch(error => {
            if (error && error.name != 'NavigationDuplicated') {
              throw error;
            }
          });
      },
    },
  },
  watch: {
    '$route.query'() {
      this._loadItems();
    },
  },
  mounted() {
    this._loadItems();
  },
  methods: {
    _loadItems() {
      this.loading = true;
      this.fetch(this.$route.query).then(() => {
        this.loading = false;
      });
    },
    fetch() {
      throw Error('Must implement fetch method if using tableMixin');
    },
  },
};
