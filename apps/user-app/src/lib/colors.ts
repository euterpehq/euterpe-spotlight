// Types and interfaces
type RGB = [number, number, number];
type Point = RGB;
type Centroid = RGB;

interface KMeansResult {
  centroids: Centroid[];
  labels: number[];
}

class KMeans {
  private k: number;
  private centroids: Centroid[];
  private labels: number[];

  constructor(k: number = 8) {
    this.k = k;
    this.centroids = [];
    this.labels = [];
  }

  private initializeCentroids(data: Point[]): void {
    const n = data.length;
    const indices = new Set<number>();
    while (indices.size < this.k) {
      indices.add(Math.floor(Math.random() * n));
    }
    this.centroids = Array.from(indices).map((i) => [...data[i]] as RGB);
  }

  private distance(a: Point, b: Point): number {
    return Math.sqrt(
      a.reduce((sum, value, i) => sum + Math.pow(value - b[i], 2), 0)
    );
  }

  private assignLabels(data: Point[]): number[] {
    return data.map((point) => {
      let minDist = Infinity;
      let label = 0;
      this.centroids.forEach((centroid, i) => {
        const dist = this.distance(point, centroid);
        if (dist < minDist) {
          minDist = dist;
          label = i;
        }
      });
      return label;
    });
  }

  private updateCentroids(data: Point[], labels: number[]): Centroid[] {
    const newCentroids: number[][] = Array(this.k)
      .fill(null)
      .map(() => Array(3).fill(0));
    const counts: number[] = Array(this.k).fill(0);

    data.forEach((point, i) => {
      const label = labels[i];
      counts[label]++;
      point.forEach((value, j) => {
        newCentroids[label][j] += value;
      });
    });

    return newCentroids.map(
      (centroid, i) =>
        centroid.map((sum) => (counts[i] ? sum / counts[i] : 0)) as RGB
    );
  }

  fit(data: Point[], maxIterations: number = 100): KMeansResult {
    this.initializeCentroids(data);

    for (let i = 0; i < maxIterations; i++) {
      const newLabels = this.assignLabels(data);
      const newCentroids = this.updateCentroids(data, newLabels);

      // Check for convergence
      if (JSON.stringify(newCentroids) === JSON.stringify(this.centroids)) {
        break;
      }

      this.centroids = newCentroids;
      this.labels = newLabels;
    }

    return {
      centroids: this.centroids,
      labels: this.labels,
    };
  }
}

interface SpotifyBackgroundColorOptions {
  k?: number;
  colorTol?: number;
}

class SpotifyBackgroundColor {
  private imageData: Uint8ClampedArray | number[];
  private width: number;
  private height: number;

  constructor(
    imageData: Uint8ClampedArray | number[],
    width: number,
    height: number
  ) {
    this.imageData = imageData;
    this.width = width;
    this.height = height;
  }

  private colorfulness(r: number, g: number, b: number): number {
    const rg = Math.abs(r - g);
    const yb = Math.abs(0.5 * (r + g) - b);

    // Calculate mean and standard deviation
    const mean = Math.sqrt(rg * rg + yb * yb);
    // Simplified std calculation since we're dealing with single values
    const std = rg + yb;

    return std + 0.3 * mean;
  }

  private findHistogram(labels: number[], k: number): number[] {
    const hist = new Array(k).fill(0);
    labels.forEach((label) => hist[label]++);

    // Normalize
    const sum = hist.reduce((a, b) => a + b, 0);
    return hist.map((count) => count / sum);
  }

  getBestColor(options: SpotifyBackgroundColorOptions = {}): RGB {
    const { k = 8, colorTol = 10 } = options;

    // Convert image data to array of RGB values
    const pixels: RGB[] = [];
    for (let i = 0; i < this.imageData.length; i += 4) {
      pixels.push([
        this.imageData[i],
        this.imageData[i + 1],
        this.imageData[i + 2],
      ]);
    }

    // Perform k-means clustering
    const kmeans = new KMeans(k);
    const { centroids } = kmeans.fit(pixels);

    // Calculate colorfulness for each centroid
    const colorfulness = centroids.map(([r, g, b]) =>
      this.colorfulness(r, g, b)
    );

    const maxColorful = Math.max(...colorfulness);

    if (maxColorful < colorTol) {
      // If not colorful enough, return gray
      return [230, 230, 230];
    } else {
      // Return the most colorful centroid
      const mostColorfulIndex = colorfulness.indexOf(maxColorful);
      return centroids[mostColorfulIndex].map(Math.round) as RGB;
    }
  }
}

// Helper function for easier usage
function getBackgroundColor(
  imageData: Uint8ClampedArray | number[],
  width: number,
  height: number,
  options: SpotifyBackgroundColorOptions = {}
): RGB {
  const analyzer = new SpotifyBackgroundColor(imageData, width, height);
  return analyzer.getBestColor(options);
}

// Export types and functions
export type { RGB, SpotifyBackgroundColorOptions };

export { SpotifyBackgroundColor, getBackgroundColor };
