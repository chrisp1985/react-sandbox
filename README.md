# React Sandbox

## Background
This is a sandbox to trial some stuff with React. It leverages a lot of MUI templates and uses various imports to see how to integrate with them. My aims for this project were:

a) Improve my understanding of React and deployment pipelines for frontends.
b) Get more familiar with AI for coding.

I used GitHub CoPilot for some areas of the project but found that more often than not, code would be introduced into the codebase that was incorrect or not what I wanted. Debugging that code was then a lot of extra effort.

A more palatable solution was to use ChatGPT to ask questions, understand the answers and apply the suggested code to the codebase myself. From a skilling up point of view, I obviously understood my codebase far better and had more control over it than when it was applied automatically for me. GitHub CoPilot would frequently get CSS updates completely wrong, stretching windows off the edge of the screen or creating Typescript functions that consistently passed through any[] as the type.

The sections below detail the work involved. Some was fairly basic, some a bit trickier.

## MUI Nav
All of the navigation components have been taken from MUI's examples. On web, the menu items are stretched across the bar at the top, whereas on mobile you get the burger icon with a menu accessible from within. Initially, I had the navigation as a static window on the left of the screen, but it felt clunky on mobile.

## Examples
### Films
In the films section, it's a basic search function. The films themselves are just served from a const TS function, but the search function uses state and memo hooks. When something is updated in the search field, state is updated and fed through to the memo hook to filter the list of all films with those characters, which are then displayed to the user. This means that the list is updated on each key press rather than needing to wait until a submit button is pressed.

It's fairly basic, but shows searching and rendering of the film cards as popouts as well.

### NFL
This section shows how to hit an external API, and CORS considerations. As the API is made to be hit from a client and we have no control over the API itself, we need to route request to the NFL API through a proxy to hit the endpoint successfully. To do this, we have a section in the vite config:

```
export default defineConfig({
  build: {
    outDir: "dist"
  },
  plugins: [react()],
  server: {
    proxy: {
      '/nfl-api': {
        target: 'https://api.sportsdata.io/v3/nfl/scores/json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nfl-api/, ''),
      },
    },
  },
})
```
The NFL API requires an authentication key through the SportsData API, but will then fetch all the NFL Players and allow to search in a similar way to the Films section.

### Rick And Morty API
The Rick and Morty API gives me the opportunity to play with charts and APIs in more depth. The API requires no authentication, and I can take some of the data and create fairly noddy charts out of it.

The initial set of charts implemented use a REST API to get the data and MUI for the charts. Each chart is broken into a new component, so the actual page just implements each of the components. The page does one fetch on initialising and passes the data through to the component via props so we're not fetching for each chart.

For the chart itself in MUI, you feed the data into the component as props, like this:

```
<BarChart
    xAxis={[{ scaleType: "band", data: seasonLabels }]}
    series={[{ data: seasonCounts, label: "Episodes" }]}
    height={300}/>
</>
```
The chart itself isn't massively interesting, it's more about playing with the fetching of data and how it can be rendered.

I aim to use the GraphQL interface to fetch some data for charts as well. I don't imagine that'll be too wildly different, just a different request.

### Elexon BMRS
Elexon allow users to grab data via their BMRS client for market activity. The endpoint itself is fairly limited in that it only supplies the latest data, but I've written a client in the past to listen to the Insights Real-Time Information Service (IRIS) service, store the data and serve it. Given I'm not using a server here, the data is just fetched straight from the API.

The charting library used is recharts, which I think is a more standard charting library in front ends. The charting implementation is slightly different, with components within the charting component setting the config rather than being passed in at the top level as props like with the MUI charts:

```
<BarChart data={chartData}>
<XAxis
    dataKey="period"
    textAnchor="end"
    height={80}
    interval={0}
/>
<YAxis label={{ value: 'Contribution', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 16 } }} />
<Tooltip />
{units.map((unit, idx) => (
    <Bar key={unit} dataKey={unit} stackId="a" fill={unitColors[idx]} />
))}
</BarChart>
```
So here, we set the XAxis and YAxis values and any tooltip values, then take each unit and turn it into a separate bar within the chart. That feels a bit more flexible that MUI Charts, as MUI takes the data series and does everything for you.

MUI is maybe more useful for quick charting where there's not a lot of cusomisation needed, whereas ReCharts is more useful if there's a specific view you want to show for your data.

## Deployment
On git push to main, the pipelines in Github are run to build the application, and then push the built application into an S3 bucket. A CloudFront distribution allows us to access the front end through:

https://d1f106m990pgis.cloudfront.net/

In this solution, the bucket is private with CloudFront as the entry point. Putting the solution into a bucket for web hosting and making it public can open up for DDOS attacks which CloudFront and WAF can mitigate.

I don't worry too much about Search Engine Optimisation (SEO) or Server Side Rendering (SSR) so there's no TanStack or NextJS need here. If there was, the server would need to be containerised and deployed in AppRunner or a small ECS solution which feels a bit pointless for a small private project.

The infrastructure is created through Terraform, and executed through GitHub pipelines.