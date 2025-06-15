---
create_time: 1749697490
edit_time: 1749889302
title: ctb_quantized mesh分支
categories:
  - skill
---


# 1. 代码：

https://github.com/ahuarte47/cesium-terrain-builder/tree/master-quantized-mesh

# 2. ctb-tile

main()&gt;runtile

多线程

```cpp
for (int i = 0; i < threadCount ; ++i) {
    packaged_task<int(const char *, TerrainBuild *, Grid *, TerrainMetadata *)> task(runTiler); // wrap the function
    tasks.push_back(task.get_future()); // get a future
    thread(move(task), command.getInputFilename(), &command, &grid, metadata).detach(); // launch on a thread
  }
```

buildTerrain()-&gt;buildMesh()

MeshTiler::createMesh()

```cpp
MeshTile *
ctb::MeshTiler::createMesh(GDALDataset *dataset, const TileCoordinate &coord, ctb::GDALDatasetReader *reader) const {
  // Copy the raster data into an array
  float *rasterHeights = reader->readRasterHeights(dataset, coord, mGrid.tileSize(), mGrid.tileSize());

  // Get a mesh tile represented by the tile coordinate
  MeshTile *terrainTile = new MeshTile(coord);
  prepareSettingsOfTile(terrainTile, dataset, coord, rasterHeights, mGrid.tileSize(), mGrid.tileSize());
  CPLFree(rasterHeights);

  return terrainTile;
}
```

GDALDatasetReaderWithOverviews-&gt;readRasterHeights

meshtile写文件操作

MeshTile::writeFile(CTBOutputStream &ostream, bool writeVertexNormals) 

