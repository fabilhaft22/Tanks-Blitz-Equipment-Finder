import * as fs from "fs";
import * as lz4 from "lz4";
import * as crc32 from "crc";

/**
 * Reads and extracts the DVPL footer.
 */
function readDVPLFooter(buffer: Buffer) {
    const footerBuffer = buffer.slice(buffer.length - 20); // Last 20 bytes

    if (footerBuffer.toString("utf8", 16, 20) !== "DVPL") {
        throw new Error("Invalid DVPL Footer");
    }

    return {
        originalSize: footerBuffer.readUInt32LE(0),
        compressedSize: footerBuffer.readUInt32LE(4),
        checksum: footerBuffer.readUInt32LE(8),
        compressionType: footerBuffer.readUInt32LE(12),
    };
}

/**
 * Decompresses a DVPL file and returns its content as a string.
 */
export function decompressDVPLToString(filePath: string): string {
    const buffer = fs.readFileSync(filePath);
    const footer = readDVPLFooter(buffer);

    const compressedData = buffer.slice(0, buffer.length - 20); // Remove footer

    if (compressedData.length !== footer.compressedSize) {
        throw new Error("DVPL Size Mismatch");
    }

    if (crc32.crc32(compressedData) !== footer.checksum) {
        throw new Error("DVPL CRC32 Mismatch");
    }

    let outputData: Buffer;

    if (footer.compressionType === 0) {
        // Type 0 = Uncompressed
        outputData = compressedData;
    } else if (footer.compressionType === 1 || footer.compressionType === 2) {
        // Type 1/2 = LZ4 Compressed
        outputData = Buffer.alloc(footer.originalSize);
        const decompressedSize = lz4.decodeBlock(compressedData, outputData);

        if (decompressedSize !== footer.originalSize) {
            throw new Error("DVPL Decompression Size Mismatch");
        }
    } else {
        throw new Error("Unknown DVPL Compression Type");
    }

    return outputData.toString("utf-8"); // Convert buffer to string
}