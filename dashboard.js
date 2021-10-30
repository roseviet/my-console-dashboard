import React from "react";
import blessed from "blessed";
import { render } from "react-blessed";
import Today from "./components/Today";
import Box from "./components/Box";
import { Grid } from "react-blessed-contrib";
import useCmd from "@hook/useCmd";
import chalk from "chalk";

const App = () => {
  const { data, error, loading } = useCmd("ls -l", "");
  return (
    <Grid rows={12} cols={12}>
      <Today row={0} col={0} rowSpan={4} colSpan={6} timeInterval={5000} />
      <Box label="Time Log" row={4} col={0} rowSpan={8} colSpan={3} />
      <Box label="Pomodoro" row={4} col={3} rowSpan={8} colSpan={3}>
        {loading || error ? (
          <text top="center" left="center">
            {loading ? chalk.green("loading...") : null}
            {error ? chalk.red(`Error: ${error.message || error}`) : null}
          </text>
        ) : null}
        {data || null}
      </Box>
      <Box label="Recent Commits" row={0} col={6} rowSpan={6} colSpan={6} />
      <Box label="Github" row={6} col={6} rowSpan={6} colSpan={6} />
    </Grid>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error({error, errorInfo});
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box
          label="Opp! App crash"
          left="center"
          top="center"
          width="75%"
          height="75%"
        >
          {chalk.red(`${this.state.error}\n ${this.state.errorInfo && this.state.errorInfo.componentStack}`)}
        </Box>
      );
    }

    return this.props.children;
  }
}

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Develop Dashboard",
});

screen.key(["escape", "q", "C-c"], () => process.exit(0));

const component = render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  screen
);
