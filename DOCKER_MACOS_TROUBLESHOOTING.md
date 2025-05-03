# Docker macOS Troubleshooting Guide

This guide addresses common issues when running Docker on macOS, particularly the "Unknown system error -35" that can occur when running multiple Docker projects simultaneously.

## Preventing Conflicts Between VTrack and Coinarth

To prevent conflicts between VTrack and other Docker projects like Coinarth:

1. **Never run both projects simultaneously**
   - Always use the provided scripts: `./vtrack-start.sh` and `./vtrack-stop.sh`
   - Stop VTrack before starting Coinarth, and vice versa

2. **Check for running containers before starting a new project**
   ```bash
   docker ps
   ```

3. **If you must run both simultaneously**:
   - Make sure they use different ports (VTrack uses 5500)
   - Make sure they use different Docker networks (VTrack uses vtrack-network)
   - Monitor Docker Desktop resource usage

## Fixing the "Unknown system error -35" Error

The "Unknown system error -35" is a macOS-specific error that occurs when Docker tries to access files through volume mounts. Here's how to fix it:

### Quick Fixes

1. **Restart Docker Desktop**
   - Quit Docker Desktop completely
   - Start Docker Desktop again
   - Wait for it to fully initialize before starting containers

2. **Restart your Mac**
   - Sometimes a full system restart is needed to clear file system issues

3. **Stop all containers and prune Docker**
   ```bash
   docker compose down
   docker system prune -f
   ```

### Advanced Fixes

1. **Increase Docker Resources**
   - Open Docker Desktop → Preferences → Resources
   - Increase CPU, Memory, and Swap
   - Recommended: 4 CPUs, 8GB RAM, 2GB Swap

2. **Reset Docker Desktop to Factory Settings**
   - Docker Desktop → Preferences → Reset
   - Warning: This will remove all containers, images, and volumes

3. **Use Docker Desktop Edge Version**
   - The Edge version sometimes has fixes for macOS-specific issues
   - Download from Docker's website

## Optimizing Docker on macOS

1. **Use Cached Volume Mounts**
   - VTrack is already configured to use optimized volume mounts

2. **Minimize File System Operations**
   - VTrack uses a production build approach to minimize file system operations

3. **Use Named Volumes for node_modules**
   - This prevents constant rebuilding of node_modules

4. **Avoid File Watching in Development Mode**
   - VTrack serves a static build to avoid file watching issues

## When All Else Fails

If you continue to experience issues:

1. **Use the Static Build Directly**
   - After building the project, you can serve the `dist` directory with any static file server

2. **Consider Using a Different Development Environment**
   - Consider using a Linux VM or WSL2 on Windows
   - Consider using a cloud development environment like GitHub Codespaces

## Reporting Issues

If you encounter persistent issues:

1. Collect Docker logs: `docker logs vtrack-app`
2. Check Docker Desktop logs
3. Note the exact steps to reproduce the issue
